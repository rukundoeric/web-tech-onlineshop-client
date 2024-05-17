import React, { Component } from 'react';
import Product from "./Product";
import Title from "./Title";
import {ProductConsumer} from '../context';
import useAuth from "../hooks/useAuth";

const ProductList = () => {
    const auth = useAuth();
    console.log("AUTH: ", auth);
    return (
        <React.Fragment>
            <div className="py-5">
                <div className="container">
                    <Title name="our" title="products"/>
                    <div className="row">
                        <ProductConsumer>
                            {value => (
                                value.products.map(product => (
                                    <Product key={product.id} product={product} />
                                ))
                            )}
                        </ProductConsumer>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProductList;
