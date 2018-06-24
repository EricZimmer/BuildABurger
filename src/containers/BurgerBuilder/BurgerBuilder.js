import React, { Component } from 'react';
import Auxhoc from '../../hoc/Auxhoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      }
    }
  }
  render() {
    
    return(
      <Auxhoc>
        <Burger ingredients={this.state.ingredients}/>
        <div>
          <BuildControls />
        </div>
      </Auxhoc>
    );
  }
}

export default BurgerBuilder;