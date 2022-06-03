import React, { Profiler, useState } from "react";
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
import "react-toastify/dist/ReactToastify.css";
import ProductScreen from "./screens/ProductScreen";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Dashboard from "./screens/Dashboard";
import State from "./components/State";
import Product from "./screens/Dashboard/Product";
import Category from "./screens/Dashboard/Category";
import ProfileScreen from "./screens/ProfileScreen";
import { auth, google, facebook, git } from "./config/firebase"
import { signInWithPopup, signOut } from "firebase/auth";

const App = () => {

    const [isLogin, setIsLogin] = useState(false)
    const location = useLocation();

    const [user, setUser] = useState(null)

    const LoginFalse = () => (
        <>
            <h1>Login please...</h1>
            <button style={{ width: 150, backgroundColor: '#de5246', color: 'white' }}
                onClick={() => login(google)}>
                Login with Google
            </button>
            <button style={{ width: 150, backgroundColor: '#3b5998', color: 'white' }}
                onClick={() => login(facebook)}>
                Login with Facebook
            </button>
            <button style={{ width: 150, backgroundColor: 'black', color: 'white' }}
                onClick={() => { login(git) }}>
                Login with GitHub
            </button>
        </>
    )

    const LoginTrue = () => (
        <>
            <h1>Welcome!</h1>
            <img src={user.photoURL} style={{ width: 120 }} />
            <p>Welcome {user.displayName}! Your account {user.email} has been successfully logged in at {user.metadata.lastSignInTime}</p>
            <button style={{ width: 150 }} onClick={logout}>
                Logout
            </button>
        </>
    )


    const login = async (provider) => {
        const result = await signInWithPopup(auth, provider)
        setUser(result.user)
        setIsLogin(true)
        console.log(result)
    }

    const logout = async () => {
        const result = await signOut(auth)
        setUser(null)
        setIsLogin(false)
        console.log(result)
    }



    return (
        <>
            {isLogin ? <LoginTrue /> : <LoginFalse />}
            {/* {location.pathname.startsWith("/admin") ||
                location.pathname.startsWith("/dashboard") ? null : (
                <Header />
            )} */}
            {/* <Routes>
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
                <Route path="/products" element={<ProfileScreen />} />
                <Route path="/shipping" element={<HomeScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/place-order" element={<PlaceOrderScreens />} />
                <Route path="/order" element={<OrderScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="*" element={<NotFound />} />
            </Routes> */}
            {/* {location.pathname === '/login' || location.pathname === '/register' ? null : <Footer />} */}

        </>
    );
};


export default App;
