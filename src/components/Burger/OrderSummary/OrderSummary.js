import React, { Component } from 'react';
import Aux from '../../../hoc/Auxhoc';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  //this could be functional component
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(ingrKey => {
      return (
        <li key={ingrKey}>
          <span style={{textTransform: 'capitalize'}}>{ingrKey}</span>: 
          {this.props.ingredients[ingrKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Total: ${this.props.priceTotal.toFixed(2)}</p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Aux>
    );

  }
};

export default OrderSummary;

