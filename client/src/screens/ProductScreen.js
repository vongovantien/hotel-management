import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../redux/actions/ProductActions";
import CartItem from "../components/CartItem/CartItem.js"
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
const ProductScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const getProductList = async () => {
        const payload = {
            currentPage: 1,
            perPage: 10,
        };
        await dispatch(listProduct(payload));
    };
    useEffect(() => {
        getProductList();
    }, []);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="d-flex flex-wrap">
                        {loading ? (
                            <p>Loading....</p>
                        ) : error ? (
                            toast("Something error!")
                        ) : (
                            <>
                                {products &&
                                    products.result.length > 0 &&
                                    products.result.map((product) => (
                                        <CartItem
                                            prop={product}
                                        />
                                    ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductScreen