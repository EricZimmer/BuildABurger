import React, { Component } from 'react';
import Auxhoc from '../../hoc/Auxhoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
      purchasable: false
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

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingrKey => {
        return ingredients[ingrKey];
      })
      .reduce((sum, el) =>{
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
  }

  changeIngredientHandler = (type, addOrRem) => {
    const oldCount = this.state.ingredients[type];
    let updatedCount = oldCount;
    const updatedIngredients = {...this.state.ingredients};
    const oldPrice = this.state.totalPrice;
    let newPrice = oldPrice;
    const priceChange = INGREDIENT_PRICES[type]
  
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
    this.updatePurchaseState(updatedIngredients);
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
        <Burger 
          ingredients={this.state.ingredients} />
        <div>
          <BuildControls 
            priceTotal={this.state.totalPrice}
            addIngr={this.changeIngredientHandler}
            remIngr={this.changeIngredientHandler}
            disabled={disableInfo}
            purchasable={this.state.purchasable} />
        </div>
      </Auxhoc>
    );
  }
}

export default BurgerBuilder;