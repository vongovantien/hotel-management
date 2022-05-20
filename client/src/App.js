import React, { Profiler } from "react";
import HomeScreen from "./screens/HomeScreen";

import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreens from "./screens/PlaceOrderScreens";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import Moment from 'react-moment';
import 'react-toastify/dist/ReactToastify.css';
import ProductScreen from "./screens/ProductScreen";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Dashboard from "./screens/Dashboard";
import State from "./components/State";
import Product from "./screens/Dashboard/Product";
import Category from "./screens/Dashboard/Category";

const App = () => {
    const location = useLocation();
    return (
        <>
            {location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard') ? null : <Header />}
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route
                    exact
                    path="/products/:productId"
                    element={<SingleProduct />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="admin" element={<Dashboard />}>
                    <Route path="cate-stats" element={<State />} />
                    <Route path="product-stats" element={<h1>abc</h1>} />
                    <Route path="order-stats" element={<h1>abc</h1>} />
                </Route>

                <Route path="dashboard" element={<Dashboard />}>
                    <Route path="categories" element={<Category />} />
                    <Route path="products" element={<Product />} />
                </Route>

                <Route path="/register" element={<Register />} />
                <Route path="/cart/:id?" element={<CartScreen />} />
                <Route path="/products" element={<ProductScreen />} />
                <Route path="/shipping" element={<HomeScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreens />} />
                <Route path="/order" element={<OrderScreen />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* {location.pathname === '/login' || location.pathname === '/register' ? null : <Footer />} */}
        </>

    );
};

export default App;
