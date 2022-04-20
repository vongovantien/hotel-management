import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const SingleProduct = ({ match }) => {
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };

    fetchProduct();
  }, []);

  return (
    <>
      <Header />
    </>
  );
};

export default SingleProduct;
