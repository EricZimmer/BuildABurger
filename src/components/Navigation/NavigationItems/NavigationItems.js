import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavigationItems.css';
import { Link } from 'react-router-dom';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <Link to="/">
      <NavItem active>Build A Burger</NavItem>

    </Link>
    <Link to="/checkout">
      <NavItem>Checkout</NavItem>

    </Link>
  </ul>
);

export default navigationItems;