import React, { Profiler } from "react";
import HomeScreen from "./screens/HomeScreen";

import { Routes, Route } from "react-router-dom";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreens from "./screens/PlaceOrderScreens";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route
                exact
                path="/products/:productId"
                element={<SingleProduct />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profiler />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/shipping" element={<HomeScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreens />} />
            <Route path="/order" element={<OrderScreen />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
