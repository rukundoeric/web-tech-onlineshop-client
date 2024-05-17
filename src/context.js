import React, {createContext, seState, useContext, useEffect, useState} from "react";
import {detailProduct} from "./data";
import {getAllOrders, getProducts, getUserOrders} from "./api";
import {Order, OrderProduct} from "./models";
import {checkout} from "./api/_cart";
import AuthContext from "./context/AuthProvider";
import useAuth from "./hooks/useAuth";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

const ProductContext = createContext({});
const ProductProvider = ({ children }) => {
    const { auth } = useAuth();
    const axios = useAxiosPrivate();
    const [products, setProducts] = useState([]);
    const [detailProduct, setDetailProduct] = useState({});
    const [cart, setCart] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalProduct, setModalProduct] = useState(detailProduct);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [cartTax, setCartTax] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [order, setOrder] = useState(new Order());
    const [orderProducts, setOrderProducts] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [allOrders, setAllUserOrders] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchOrders();
        addTotals();
    }, []);

    const fetchProducts = () => {
        getProducts((err, data) => {
            if (err) {
                // Handle error
            } else {
                let tempProducts = data?.data?.map(item => ({ ...item }));
                console.log("Products items: ", tempProducts);
                setProducts(tempProducts);
            }
        });
    };

    const fetchOrders = () => {
        if (auth?.profile?.role === 'ADMIN') {
            getAllOrders(axios, (err, data) => {
                if (err) {
                    // Handle error
                } else {
                    let tempOrders = data?.data?.map(item => ({ ...item }));
                    console.log("Orders items: ", tempOrders);
                    setAllUserOrders(tempOrders);
                }
            });
        } else {
            getUserOrders(axios,auth?.profile?.id, (err, data) => {
                if (err) {
                    // Handle error
                } else {
                    let tempOrders = data?.data?.map(item => ({ ...item }));
                    console.log("Orders items: ", tempOrders);
                    setUserOrders(tempOrders);
                }
            });
        }
    };

    const getItem = id => {
        return products.find(item => item.id === id);
    };

    const handleDetail = id => {
        const product = getItem(id);
        setDetailProduct(product);
    };

    const addToCart = (user, id) => {
        let tempProducts = [...products];
        const index = tempProducts.indexOf(getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        product.total = product.price;

        setProducts(tempProducts);
        setCart([...cart, product]);
        setDetailProduct({ ...product });
        addTotals();

        const newOrder = { ...order };
        newOrder.user = user;
        newOrder.totalPrice = getTotals().total;
        newOrder.status = "DRAFT";
        newOrder.orderProducts = cart.map(cartItem => {
            const orderProduct = new OrderProduct();
            orderProduct.product = cartItem;
            orderProduct.quantity = cartItem.count;
            orderProduct.unitePrice = cartItem.total;
            return orderProduct;
        });
        setOrder(newOrder);
        addTotals();
    };

    const openModal = id => {
        const product = getItem(id);
        setModalProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const increment = id => {
        let tempCart = [...cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count += 1;
        product.total = product.count * product.price;

        setCart(tempCart);
        addTotals();
    };

    const decrement = id => {
        let tempCart = [...cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count -= 1;

        if (product.count === 0) {
            removeItem(id);
        } else {
            product.total = product.count * product.price;
            setCart(tempCart);
        }
        addTotals();
    };

    const getTotals = () => {
        let subTotal = cart.reduce((acc, item) => acc + item.total, 0);
        const tax = parseFloat((subTotal * 0.1).toFixed(2));
        const total = subTotal + tax;
        return { subTotal, tax, total };
    };

    const addTotals = () => {
        const totals = getTotals();
        setCartSubTotal(totals.subTotal);
        setCartTax(totals.tax);
        setCartTotal(totals.total);
    };

    const removeItem = id => {
        let tempProducts = [...products];
        let tempCart = cart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        setCart(tempCart);
        setProducts(tempProducts);
        addTotals();
    };

    const clearCart = () => {
        console.log("ORDER: ", order);
    };

    const createOrder = (axios, order, callBack) => {
        console.log("Order request: ", order);
        checkout(axios, order, callBack);
    };

    // Add other methods as needed

    return (
        <ProductContext.Provider
            value={{
                products,
                detailProduct,
                cart,
                modalOpen,
                modalProduct,
                cartSubTotal,
                cartTax,
                cartTotal,
                order,
                orderProducts,
                handleDetail,
                addToCart,
                openModal,
                closeModal,
                increment,
                decrement,
                removeItem,
                clearCart,
                createOrder,
                fetchProducts,
                fetchOrders,
                userOrders,
                allOrders
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
