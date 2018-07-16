import React, { Component } from 'react';
import Auxhoc from '../../hoc/Auxhoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

import axios from '../../axios-orders';


class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 4.00,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false,

    }
  }
  componentDidMount() {
    /* axios.get('/ingredients.json')
      .then(response => {
        const data = response.data;
        this.setState({ingredients: {
          tomato: data.tomato,
          lettuce: data.lettuce,
          pickle: data.pickle,
          bacon: data.bacon,
          cheese: data.cheese,
          meat: data.meat
        }});
      })
      .catch(error => {
        this.setState({error: true});
      }); */
  }


  updatePurchaseState() {
    /* //requires (ingredients) passed within changedIngredientHandler(updatedIngredients)
    const sum = Object.keys(ingredients)
      .map(ingrKey => {
        return ingredients[ingrKey];
      })
      .reduce((sum, el) =>{
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0}); */
    this.setState(() => {
      const ingredients = {...this.props.ingredients};
      const sum = Object.keys(ingredients)
        .map(ingrKey => (ingredients[ingrKey]))
        .reduce((prevSum, curSum) => (prevSum + curSum), 0)
        return {
          purchasable: sum > 0
        }
    });
  }

  changeIngredientHandler = (type, addOrRem) => {
 
    this.updatePurchaseState();
  } 
  
  purchaseHandler = () => {
    this.setState({purchasing: true});
  }
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }
  purchaseContinueHandler = () => {
    //alert('You continue');
    
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout/',
      search: '?' + queryString
    });

  }

  render() {
    const disableInfo = { ...this.props.ingredients };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <=0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    
    if (this.props.ingredients) {
      this.updatePurchaseState();
      burger = ( 
        <Auxhoc>
          <Burger 
            ingredients={this.props.ingredients} />
          <BuildControls 
            priceTotal={this.props.totalPrice}
            addIngr={(ingr) => this.props.addIngredientHandler(ingr)}
            remIngr={(ingr) => this.props.removeIngredientHandler(ingr)}
            disabled={disableInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler} />
        </Auxhoc>
      );
      console.log(this.props.ingredients);
      orderSummary = <OrderSummary 
        ingredients={this.props.ingredients}
        priceTotal={this.props.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
         />
    }
    
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return(
      <Auxhoc>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
        </Modal>
        
        <div>
          {burger}
          
        </div>
      </Auxhoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
    
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: (ingr) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingr}),
    removeIngredientHandler: (ingr) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingr})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));