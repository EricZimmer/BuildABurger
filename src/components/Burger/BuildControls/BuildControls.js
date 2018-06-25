import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Lettuce', type: 'lettuce' },
  { label: 'Tomato', type: 'tomato'},
  { label: 'Pickle', type: 'pickle'},
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
  <p><strong>Total: ${props.priceTotal.toFixed(2)}</strong></p>
    {controls.map(ctrl => {
      return <BuildControl 
        key={ctrl.label} 
        label={ctrl.label}
        disabled={props.disabled[ctrl.type]}
        addIngr={() => props.addIngr(ctrl.type, 'ADD')}
        remIngr={() => props.remIngr(ctrl.type, 'REM')}  />
    })}
    <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>
      ORDER NOW
    </button>
  </div>
);

export default buildControls;