import {
    CATEGORY_ADD_NEW,
    CATEGORY_ADD_NEW_FAIL,
    CATEGORY_ADD_NEW_REQUEST,
    CATEGORY_ADD_NEW_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
} from "../constants/DashboardConstants";


export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categories: [] };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const createCategory = (state = [], action) => {
    switch (action.type) {
        case CATEGORY_ADD_NEW_REQUEST:
            return { loading: true};
        case CATEGORY_ADD_NEW_SUCCESS:
            return { loading: false, ...state, categories: action.payload };
        case CATEGORY_ADD_NEW_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};



