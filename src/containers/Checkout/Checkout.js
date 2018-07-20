import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

import { connect } from 'react-redux';

class Checkout extends Component {
  

  componentWillMount() {
    this.props.onInitPurchase();
  }
  
  componentDidUpdate() {
    
    
  }

  componentDidMount() {
    
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
    let summary = <Redirect to="/" />;
    
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary 
            ingredients={this.props.ingredients}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler} />
         <Route 
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </div>
        
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);