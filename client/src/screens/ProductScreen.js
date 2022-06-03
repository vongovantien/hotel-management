import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../redux/actions/ProductActions";
import CartItem from "../components/CartItem/CartItem.js"
import { Form, Pagination } from 'react-bootstrap';

const ProductScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProduct());
        console.info(products)
    }, [dispatch]);

    // const items = []

    // for (let i = 0; i < products.pages; i++) {
    //     items.push(i)
    // }
    return (
        <>
            <div className="container">
                <h1 className="text-danger">Tìm kiếm sản phẩm</h1>
                <Form.Control
                    type="password"
                    id="inputPassword5"
                    placeholder="Nhập tên để tìm kiếm..."
                />
                <br />
                <Form.Select aria-label="Lọc sản phẩm ...">
                    <option>Lọc sản phẩm</option>
                    <option value="1">Lọc theo giá giảm dần</option>
                    <option value="2">Lọc theo giá tăng dần</option>
                    <option value="3">Lọc theo tên từ A - Z</option>
                    <option value="3">Lọc theo tên từ Z - A</option>
                </Form.Select>
                <br />

                {/* <Pagination>
                    {products.current = 1 ? < Pagination.First disabled /> : <Pagination.First />}
                    {items.map((item) => <Pagination.Item>{item}</Pagination.Item>)}

                    {products.current = products.pages ? < Pagination.Last disabled /> : <Pagination.Last />}
                </Pagination> */}
                <div className="row">
                    <div className="d-flex flex-wrap">
                        {loading ? (
                            <p>Loading....</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            <>
                                {products &&
                                    products.products.length > 0 &&
                                    products.products.map((product) => (
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
}

export default ProductScreen