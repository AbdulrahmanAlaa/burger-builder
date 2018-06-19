import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        purchaseable: false,
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(res => {
            this.setState({ ingredients: res.data });
        }, error => { this.setState({error:true})});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const ingredients = { ...this.state.ingredients };
        ingredients[type] = updatedCount;
        const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients,
            totalPrice
        });
        this.updatePurchaseStatus(ingredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return
        }
        const updatedCount = oldCount - 1;
        const ingredients = { ...this.state.ingredients };
        ingredients[type] = updatedCount;
        const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients,
            totalPrice
        });
        this.updatePurchaseStatus(ingredients);
    }

    updatePurchaseStatus = (ingredients) => {
        const sum = Object
            .keys({ ...ingredients })
            .map(key => ingredients[key])
            .reduce((sum, ele) => sum + ele, 0);
        this.setState({
            purchaseable: sum > 0
        });
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinuedHandler = () => {
        this.setState({ loading: true });
        const order = {
            customer: {
                name: 'Abdulrahman',
                address: {
                    street: 'any street',
                    zipcode: '54321'
                },
                email: 'abdulrahmanalaa@hotmail.com'
            },
            ingredients: this.state.ingredients,
            price: this.state.totalPrice
        };
        axios.post('orders.json', order)
            .then(res => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.state.error?<p>ERROR failed to load ingredients...</p>:<Spinner />;
        let order = null;
        if (this.state.ingredients) {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    purchase={this.purchasingHandler}
                />
            </Aux>);
            order = <OrderSummary
                totalPrice={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinuedHandler}
                ingredients={this.state.ingredients} />
        }
        if (this.state.loading) {
            order = <Spinner />
        }

        return (
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {order}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
export default withErrorHandler(BurgerBuilder, axios);