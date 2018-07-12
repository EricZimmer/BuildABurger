import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {}
  }
  

  componentDidMount() {
    this.parseQueryParams ();
  }
  
  componentDidUpdate() {
    
    console.log(this.state.ingredients);
  }

  parseQueryParams () {
    const query = new URLSearchParams(this.props.location.search);
    const orderIngredients = {};

    for (let param of query.entries() ) {
      orderIngredients[param[0]] = +param[1];
    }
    this.setState({
      ingredients: orderIngredients
    });
    
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  render() {
    return (
      <div>
        <CheckoutSummary 

          ingredients={this.state.ingredients}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}/>
      </div>
    );
  }
}

export default Checkout;