import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productDetailReducer,
    productListReducer,
} from "./reducers/ProductReducers";
import { cartReducer } from "./reducers/CartReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
});

const cartItemFromLocalStorage = localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [];
const initialState = {
    cart: {
        cartItems: cartItemFromLocalStorage
    }
};

const middleWare = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
