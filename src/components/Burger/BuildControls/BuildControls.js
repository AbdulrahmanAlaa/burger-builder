import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Salad', type: 'salad' }
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map(ctrl =>
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                        added={() => props.ingredientAdded(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}
                    />
                )
            }
            <button disabled={!props.purchaseable} onClick={()=>props.purchase()} className={classes.OrderButton}>ORDER NOW</button>
        </div>
    );
}
export default BuildControls;