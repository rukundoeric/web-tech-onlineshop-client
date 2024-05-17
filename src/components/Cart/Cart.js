import React, { Component } from 'react'
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import { ProductConsumer} from '../../context';
import CartList from './CartList';
import CartTotals from "./CartTotals";
import Line from "../Shared/Line";

export default class Store extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const { cart } = value;
                        if (cart.length > 0) {
                            return (
                                <React.Fragment>
                                    <Line />
                                    <Title name="your" title="cart" />
                                    <Line />
                                    <div className="card pt-5 px-3 m-5">
                                        <CartColumns />
                                        <CartList value={value} />
                                        <CartTotals value={value} history={this.props.history} />
                                    </div>
                                </React.Fragment>
                            );
                        } else {
                            return <EmptyCart />;
                        }
                    }}
                </ProductConsumer>
            </section>
        );
    }
}
