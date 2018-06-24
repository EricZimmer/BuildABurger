import React, { Component } from 'react';
import Auxhoc from '../../hoc/Auxhoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  lettuce: 0.50,
  cheese: 1.00,
  bacon: 0.90,
  meat: 1.50
};

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4.00
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

  changeIngredientHandler = (type, addOrSub) => {
    const oldCount = this.state.ingredients[type];
    let updatedCount = oldCount;
    const updatedIngredients = {...this.state.ingredients};
    const oldPrice = this.state.totalPrice;
    let newPrice = oldPrice;
    const priceChange = INGREDIENT_PRICES[type]
  
    if(addOrSub === 'ADD') {
      updatedCount += 1;
      newPrice += priceChange;
    } else if(oldCount >= 1 && addOrSub === 'SUB') {
      updatedCount -= 1;
      newPrice -= priceChange;
    }

    
    console.log('LOCALPRICE', newPrice);
    
    updatedIngredients[type] = updatedCount;
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });

    console.log('STATEPRICE', this.state.totalPrice);
  }

  render() {
    
    return(
      <Auxhoc>
        <Burger 
          ingredients={this.state.ingredients}
          priceTotal={this.state.totalPrice} />
        <div>
          <BuildControls 
            addIngr={this.changeIngredientHandler}
            remIngr={this.changeIngredientHandler} />
        </div>
      </Auxhoc>
    );
  }
}

export default BurgerBuilder;