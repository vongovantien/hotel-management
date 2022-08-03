import axios from "axios";

export const endpoints = {
    'login': '/user/login/',
    'products': 'api/products/'
}

export default axios.create({
    baseURL: 'http://localhost:5000/'
}) 