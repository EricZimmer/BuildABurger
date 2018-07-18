import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ingredientName
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ingredientName
  };
};

export const setIngredients = (ingredients) => {
  console.log(ingredients.tomato);
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: {
      tomato: ingredients.tomato,
      lettuce: ingredients.lettuce,
      pickle: ingredients.pickle,
      bacon: ingredients.bacon,
      cheese: ingredients.cheese,
      meat: ingredients.meat
    }
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error: true
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
        
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  }
};