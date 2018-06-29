import React from 'react';
import Auxhoc from '../../hoc/Auxhoc';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = ( props ) => (
  <Auxhoc>
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Auxhoc>
);


export default layout;