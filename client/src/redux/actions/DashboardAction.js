import axios from "axios";
import {
    CATEGORY_ADD_NEW_REQUEST,
    CATEGORY_ADD_NEW_FAIL,
    CATEGORY_ADD_NEW_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
} from "../constants/DashboardConstants";

export const listCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST });
        const { data } = await axios.get("/api/categories");
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DELETE_REQUEST });
        await axios.delete(`/api/categories/${id}`);
        dispatch({ type: CATEGORY_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createCategory = (name, productType) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_ADD_NEW_REQUEST });
        const { data } = await axios.post("/api/categories", { name, productType });
        dispatch({ type: CATEGORY_ADD_NEW_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CATEGORY_ADD_NEW_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};