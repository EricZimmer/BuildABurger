import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  console.log('burger: ', props.ingredients );
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingrKey => {
      return [...Array(props.ingredients[ingrKey])].map((_, i) => {
        return <BurgerIngredient key={ingrKey + i} type={ingrKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add ingredients!</p>;
  }

  
  return (
    <div className={classes.Burger}>
      
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;