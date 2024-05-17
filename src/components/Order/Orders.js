import React, {useEffect, useState} from 'react'
import Title from '../Title';
import { ProductConsumer} from '../../context';
import Line from "../Shared/Line";
import OrderColumns from "./OrderColumns";
import OrderList from "./OrderList";
import EmptyOrders from "./EmptyOrders";
import OrderTotals from "./OrderTotals";
import useAuth from "../../hooks/useAuth";

const Orders = () => {
    const { auth } = useAuth();
    const [fetched, setFetched] = useState(false);
    // useEffect(() => {
    //     fetchProducts();
    //     fetchOrders();
    // }, []);

    return (
        <section>
            <ProductConsumer>
                {value => {
                    const { userOrders, allOrders, fetchOrders, fetchProducts } = value;
                    const orders = auth?.profile?.role === 'ADMIN' ? allOrders : userOrders;
                    if (!fetched) {
                        fetchOrders();
                        setFetched(true);
                    }
                    if (orders.length > 0) {
                        return (
                            <React.Fragment>
                                <Line />
                                <Title name="your" title="cart" />
                                <Line />
                                <div className="card pt-5 px-3 m-5">
                                    <OrderColumns />
                                    <OrderList value={value} />
                                    <OrderTotals value={value} history={this.props.history} />
                                </div>
                            </React.Fragment>
                        );
                    } else {
                        return <EmptyOrders />;
                    }
                }}
            </ProductConsumer>
        </section>
    );
}

export  default Orders;
