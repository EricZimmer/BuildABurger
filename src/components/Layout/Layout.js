import React from 'react';
import Auxhoc from '../../hoc/Auxhoc';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = ( props ) => (
  <Auxhoc>
    <Toolbar />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Auxhoc>
);


export default layout;