import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }
  

  componentWillMount() {
    this.parseQueryParams ();
  }
  
  componentDidUpdate() {
    
    
  }

  parseQueryParams () {
    const query = new URLSearchParams(this.props.location.search);
    const orderIngredients = {};

    for (let param of query.entries() ) {
      if (param[0]==='price') {
        this.setState({totalPrice: param[1]});
      } else {
        orderIngredients[param[0]] = +param[1];

      }
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
          checkoutContinue={this.checkoutContinueHandler} />
        <Route 
          path={this.props.match.url + '/contact-data'}
          render={(props) => (
            <ContactData 
              {...props}
              ingredients={this.state.ingredients} 
              price={this.state.totalPrice} />
          )}/>
      </div>
    );
  }
}

export default Checkout;