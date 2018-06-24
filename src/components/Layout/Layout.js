import React from 'react';
import Auxhoc from '../../hoc/Auxhoc';
import classes from './Layout.css';

const layout = ( props ) => (
  <Auxhoc>
    
    <main className={classes.Content}>
      {props.children}
    </main>
  </Auxhoc>
);


export default layout;