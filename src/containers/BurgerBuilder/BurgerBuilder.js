import React, { Component } from 'react';
import Auxhoc from '../../hoc/Auxhoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  cheese: 1,
  bacon: 0.9,
  meat: 1.5
};

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        lettuce: 0,
        bacon: 1,
        cheese: 0,
        meat: 1
      },
      totalPrice: 4
    }
  }

  addIngredientHandler = (type) => {
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
  }

  render() {
    
    return(
      <Auxhoc>
        <Burger ingredients={this.state.ingredients}/>
        <div>
          <BuildControls 
            addIngr={this.addIngredientHandler}
            remIngr={this.removeIngredientHandler} />
        </div>
      </Auxhoc>
    );
  }
}

export default BurgerBuilder;