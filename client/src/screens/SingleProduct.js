import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CartItem from "../components/CartItem";
import Header from "../components/Header";
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
    return (
        <>
            <Header />
            <div>
                {loading ? (
                    <p>loading...</p>
                ) : error ? (
                    <p>Error</p>
                ) : (
                    product && (
                        <>
                            <Card style={{ width: "18rem" }}>
                                <Card.Img
                                    variant="top"
                                    src="{prop.image}"
                                    alt="Product Image"
                                />
                                <Card.Body>
                                    <Card.Title>
                                        Product name: {product.name}
                                    </Card.Title>

                                    <Card.Text>
                                        Price: {product.price}
                                    </Card.Text>
                                    <Card.Text>
                                        Status:{" "}
                                        {product.countInStock > 0
                                            ? "Còn hàng"
                                            : " Hết hàng"}
                                    </Card.Text>
                                    <Card.Text>
                                        Reviews: {product.numReviews}
                                    </Card.Text>
                                    <Card.Text>
                                        Description: {product.description}
                                    </Card.Text>

                                    {product.countInStock > 0 ? (
                                        <Button variant="primary">
                                            Add to Cart
                                        </Button>
                                    ) : null}
                                </Card.Body>
                            </Card>
                        </>
                    )
                )}
            </div>
        </>
    );
};

export default SingleProduct;
