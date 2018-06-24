import React, { Component } from 'react';
import Auxhoc from '../../hoc/Auxhoc';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        lettuce: 1,
        bacon: 3,
        cheese: 2,
        meat: 2
      }
    }
  }
  render() {
    
    return(
      <Auxhoc>
        <Burger ingredients={this.state.ingredients}/>
        <div>
          Build Controls
        </div>
      </Auxhoc>
    );
  }
}

export default BurgerBuilder;