import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component {
  

  componentWillMount() {
    
  }
  
  componentDidUpdate() {
    
    
  }

  /* parseQueryParams () {
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
 */
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

          ingredients={this.props.ingredients}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler} />
        <Route 
          path={this.props.match.url + '/contact-data'}
          component={ContactData}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
}

export default connect(mapStateToProps)(Checkout);