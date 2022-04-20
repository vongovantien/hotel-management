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
};

export default ShopSection;
