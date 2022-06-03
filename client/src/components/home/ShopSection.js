<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import axios from "axios";
const ShopSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = axios.get;
    };
  }, []);

  return <div>ShopSection</div>;
=======
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../redux/actions/ProductActions";
import CartItem from "../CartItem/CartItem";
const ShopSection = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProduct());
    }, [dispatch]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="d-flex flex-wrap">
                        {loading ? (
                            <p>Loading....</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            <>
                                {products &&
                                    products.length > 0 &&
                                    products.map((product) => (
                                        <CartItem
                                            key={product._id}
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
>>>>>>> main
};

export default ShopSection;
