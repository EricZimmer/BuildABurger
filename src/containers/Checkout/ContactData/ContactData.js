import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: '',
    },
    loading: false
  }
  
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.props.price,
      customer: {
        name: 'Urc Zeemer',
        address: {
          street: '123 Fake St',
          zipCode: '14212',
          country: 'US'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
  }

  render() {
    let form = (
      <form>
          <input 
            className={classes.Contact} 
            type='text' name='name' placeholder='Enter your name' />
          <input 
            className={classes.Contact} 
            type='email' name='email' placeholder='Enter your email' />
          <input 
            className={classes.Contact} 
            type='text' name='address' placeholder='Enter your address' />
          <input 
            className={classes.Contact} 
            type='text' name='zipCode' placeholder='Enter your zip code' />
          <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
        </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact information</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;