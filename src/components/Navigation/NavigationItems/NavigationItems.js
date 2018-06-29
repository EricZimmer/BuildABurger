import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavItem link="/" linkName="Build A Burger" active />
    <NavItem link="/" linkName="Checkout" />
  </ul>
);

export default navigationItems;