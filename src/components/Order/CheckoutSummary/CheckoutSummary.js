import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

import { Link } from 'react-router-dom';

class CheckoutSummary extends Component {

  render() {
    console.log('checkout sum props: ' + this.props.history);
    return (
      
      <div className={classes.CheckoutSummary}>
        <h1>Enjoy your burger!</h1>
        <div style={{width: '100%', margin: 'auto'}}>
          <Burger ingredients={this.props.ingredients} />
        </div>
      
        <Button 
          btnType="Danger" 
          clicked={this.props.checkoutCancel}>CANCEL</Button>
        <Button 
          btnType="Success" 
          clicked={this.props.checkoutContinue}>CONTINUE</Button>
      </div>
    )

  }
}

export default CheckoutSummary;