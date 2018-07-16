import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    lettuce: 0,
    tomato: 0,
    pickle: 0,
    cheese: 0,
    bacon: 0,
    meat: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  lettuce: 0.50,
  tomato: 0.65,
  pickle: 0.25,
  cheese: 1.00,
  bacon: 0.90,
  meat: 1.70
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
      }
    default:
      return state;
  }
  
};

export default reducer;