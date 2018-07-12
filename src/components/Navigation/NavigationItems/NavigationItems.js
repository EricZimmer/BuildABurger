import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavigationItems.css';
import { Link } from 'react-router-dom';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    
    <NavItem exact link="/">Build A Burger</NavItem>
    <NavItem link="/orders">Orders</NavItem>

  </ul>
);

export default navigationItems;