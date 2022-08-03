import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CartItem from "../components/CartItem/CartItem";
import Header from "../components/Header/Header";
import { singleProduct } from "../redux/actions/ProductActions";

const SingleProduct = ({ match }) => {
    const [qty, setQty] = useState(0);
    const dispatch = useDispatch();
    const { productId } = useParams();

    console.log(productId);
    const productDetail = useSelector((state) => state.productDetail);
    const { loading, error, product } = productDetail;

    useEffect(() => {
        dispatch(singleProduct(productId));
    }, [dispatch, productId]);

    console.log(product)

    return (
        <>
            <div>
                {loading ? (
                    <p>loading...</p>
                ) : error ? (
                    <p>Error</p>
                ) : (
                    product && (
                        <>
                            <Container>
                                <Row>
                                    <Col>
                                        <Image style={{ width: '80%', textAlign: "center" }} src={product.image}
                                            alt="Product Image" />
                                    </Col>
                                    <Col>
                                        <p>Tên sản phẩm: {product.name}</p>
                                        <p>Giá tiền: {product.price}</p>
                                        <p>Trạng thái: {product.countInStock > 0 ? "Còn hàng" : " Hết hàng"}</p>
                                        <p>Reviews: {product.numReviews}</p>
                                        {product.countInStock > 0 ? (
                                            <Button variant="primary">
                                                Add to Cart
                                            </Button>
                                        ) : null}
                                    </Col>
                                </Row>
                            </Container>
                        </>
                    )
                )}
            </div>
        </>
    );
};

export default SingleProduct;
