import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meet: 2,
            bacon: 1,
            cheese: 1,
            salad: 1
        }
    }
    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients } />
                <div>Burger Controls</div>
            </Aux>
        );
    }
}