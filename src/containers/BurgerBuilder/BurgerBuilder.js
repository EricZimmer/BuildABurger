import React, { Component } from 'react';
import Auxhoc from '../../hoc/Auxhoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as burgerBuilderActions from '../../store/actions/index';
import { connect } from 'react-redux';
import axios from '../../axios-orders';




class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
    }
  }
  componentDidMount() {
    this.props.initIngredients();
  }


  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingrKey => (ingredients[ingrKey]))
      .reduce((prevSum, curSum) => (prevSum + curSum), 0);
    return  sum > 0;
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
      pathname: '/checkout/'
    });

  }

  render() {
    const disableInfo = { ...this.props.ingredients };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <=0;
    }

    let orderSummary = null;
    
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    
    if (this.props.ingredients) {
      console.log(this.props.ingredients);
      burger = ( 
        <Auxhoc>
          <Burger 
            ingredients={this.props.ingredients} />
          <BuildControls 
            priceTotal={this.props.totalPrice}
            addIngr={(ingr) => this.props.addIngredientHandler(ingr)}
            remIngr={(ingr) => this.props.removeIngredientHandler(ingr)}
            disabled={disableInfo}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler} />
        </Auxhoc>
      );

      orderSummary = <OrderSummary 
        ingredients={this.props.ingredients}
        priceTotal={this.props.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
         />
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
    totalPrice: state.totalPrice,
    error: state.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: (ingr) => dispatch(burgerBuilderActions.addIngredient(ingr)),
    removeIngredientHandler: (ingr) => dispatch(burgerBuilderActions.removeIngredient(ingr)),
    initIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));