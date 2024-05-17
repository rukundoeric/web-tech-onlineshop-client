import React from 'react';
import OrderItem from "./OrderItem";

export default function OrderList({value}) {
    const { cart } = value;

    return (
     <div className="container-fluid">
         {cart.map(item=>{
             return <OrderItem key={item.id} item={item} value={value}/>
         })}

    </div>
    );
}
