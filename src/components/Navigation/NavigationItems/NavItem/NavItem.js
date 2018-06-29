import React from 'react';
import classes from './NavItem.css';

const navItem = (props) => (
  <li className={classes.NavItem}>
    <a 
      href={props.link}
      className={props.active ? classes.active : null}>
      {props.linkName}
    </a>
  </li>
);

export default navItem;