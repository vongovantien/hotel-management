import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import configureStore from "@reduxjs/toolkit";
import {
    createProduct,
    createProductReducer,
    productDetailReducer,
    productListReducer,
} from "./reducers/ProductReducers";
import { cartReducer } from "./reducers/CartReducers";
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
} from "./reducers/UserReducers";
import {
    categoryListReducer,
    createCategory,
    createCategoryReducer,
} from "./reducers/DashboardReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    categoriesList: categoryListReducer,
    createCategory: createCategoryReducer,
    createProduct: createProductReducer,
});

const cartItemFromLocalStorage = localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [];

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    cart: {
        cartItems: cartItemFromLocalStorage,
    },
    userLogin: {
        userLogin: {
            userInfoFromLocalStorage,
        },
    },
};

const middleWare = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
