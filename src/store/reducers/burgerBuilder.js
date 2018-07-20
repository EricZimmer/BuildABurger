import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  lettuce: 0.50,
  tomato: 0.65,
  pickle: 0.25,
  cheese: 1.00,
  bacon: 0.90,
  meat: 1.70
};

const changeIngredientHandler = (state, action) => {
  let updatedIngredient = {};
  let updatedIngredients = {};
  let updatedPrice = 0;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      updatedIngredient = {[action.ingredient]: state.ingredients[action.ingredient] + 1};
      updatedIngredients = updateObject(state.ingredients, updatedIngredient ); 
      updatedPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredient]
      break;
    case actionTypes.REMOVE_INGREDIENT:
      updatedIngredient = {[action.ingredient]: state.ingredients[action.ingredient] - 1};
      updatedIngredients = updateObject(state.ingredients, updatedIngredient ); 
      updatedPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredient]
      break;
    default: return null;
  }
    
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: updatedPrice
  };
  return updateObject(state, updatedState);
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return changeIngredientHandler(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return changeIngredientHandler(state, action);
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          ...state.ingredients,
          ...action.ingredients,
          
        },
        totalPrice: 4,
        error: false
      })
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {error: true});
    default:
      return state;
  }
  
};

export default reducer;