import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const CartItem = ({ prop }) => {
    let p = `/products/${prop._id}`;
    return (
        <div className="col-md-4 p-3">
            <Card>
                {/* <Card.Img variant="top" src="{prop.image}" /> */}
                <Card.Body className="text-center">
                    <Card.Title>{prop.name}</Card.Title>
                    <Card.Text>{prop.description}</Card.Text>
                    <Card.Text>{prop.price}</Card.Text>
                    <Card.Text>{prop.countInStock}</Card.Text>
                    <Link to={p}>Xem chi tiết</Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CartItem;
