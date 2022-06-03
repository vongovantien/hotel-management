<<<<<<< HEAD
import React from 'react'

const CartScreen = () => {
  return (
    <div>CartScreen</div>
  )
}

export default CartScreen
=======
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeToCart } from "../redux/actions/CartAction";
const CartScreen = () => {
    const dispatch = useDispatch();
    const productId = useParams();
    const navigate = useNavigate();
    // const qty = location.search ? Number(location.search.split("=")[1]) : 1;
    const [qty] = useSearchParams();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    console.log(qty);
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const checkOutHandler = () => {
        navigate.push("/login?redirect=shipping");
    };

    const removeFromCartHandler = () => {
        dispatch(removeToCart(productId));
    };
    return <div>CartScreen</div>;
};

export default CartScreen;
>>>>>>> main
