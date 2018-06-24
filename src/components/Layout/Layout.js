import React from 'react';
import Auxhoc from '../../hoc/Auxhoc';
import classes from './Layout.css';

const layout = ( props ) => (
  <Auxhoc>
    <div>
      Toolbar, SideDrawer, Backdrop
    </div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Auxhoc>
);


export default layout;