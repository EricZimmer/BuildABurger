import React, { Component } from 'react';
import Auxhoc from '../../hoc/Auxhoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  lettuce: 0.50,
  tomato: 0.65,
  pickle: 0.25,
  cheese: 1.00,
  bacon: 0.90,
  meat: 1.70
};

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        lettuce: 0,
        tomato: 0,
        pickle: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4.00,
      purchasable: false,
      purchasing: false
    }
  }

/*   addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceSubtraction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceSubtraction;
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
  } */

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
    this.setState((prevState, props) => {
      const ingredients = {...prevState.ingredients};
      const sum = Object.keys(ingredients)
        .map(ingrKey => (ingredients[ingrKey]))
        .reduce((prevSum, curSum) => (prevSum + curSum), 0)
        return {
          purchasable: sum > 0
        }
    });
  }

  changeIngredientHandler = (type, addOrRem) => {
    const oldCount = this.state.ingredients[type];
    let updatedCount = oldCount;
    const updatedIngredients = {...this.state.ingredients};
    const oldPrice = this.state.totalPrice;
    let newPrice = oldPrice;
    const priceChange = INGREDIENT_PRICES[type];
    
    if(addOrRem === 'ADD') {
      updatedCount += 1;
      newPrice += priceChange;
    } else if(oldCount >= 1 && addOrRem === 'REM') {
      updatedCount -= 1;
      newPrice -= priceChange;
    }
    
    updatedIngredients[type] = updatedCount;
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState();
  } 
  
  purchaseHandler = () => {
    this.setState({purchasing: true});
  }
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }
  purchaseContinueHandler = () => {
    alert('You continue');
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <=0;
    }
    return(
      <Auxhoc>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            priceTotal={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler} />
        </Modal>
        <Burger 
          ingredients={this.state.ingredients} />
        <div>
          <BuildControls 
            priceTotal={this.state.totalPrice}
            addIngr={this.changeIngredientHandler}
            remIngr={this.changeIngredientHandler}
            disabled={disableInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler} />
        </div>
      </Auxhoc>
    );
  }
}

export default BurgerBuilder;