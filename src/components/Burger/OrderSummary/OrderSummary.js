import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return (<li key={ingKey} >
                <span style={{ textTransform: 'Capitalize' }}>{ingKey}: {props.ingredients[ingKey]} </span>
            </li>);
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to Checkout?</p>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <Button btnType="Danger" click={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" click={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}
export default OrderSummary;