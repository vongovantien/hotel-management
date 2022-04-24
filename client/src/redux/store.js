import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productDetailReducer,
    productListReducer,
} from "./reducers/ProductReducers";
import { cartReducer } from "./reducers/CartReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/UserReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
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
