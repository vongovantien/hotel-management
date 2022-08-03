import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";

const CartItem = ({ prop }) => {
    let p = `/products/${prop._id}`;
    console.log(prop)
    return (
        <div className="col-md-3 p-3">
            <Card>
                <Card.Img variant="top" src={prop.image} />
                <Card.Body className="text-center">
                    <Card.Title>Tên sản phẩm: {prop.name}</Card.Title>
                    <Card.Text>Giá tiền: {prop.price}</Card.Text>
                    <Card.Text>Số lượng: {prop.countInStock}</Card.Text>
                    <Card.Text>Miêu tả: {prop.description}</Card.Text>
                    <Link to={`/products/${prop._id}`}>
                        <Button variant="primary">Xem chi tiết</Button>
                    </Link>
                    &nbsp;
                    <Button variant="danger"> <BsFillCartPlusFill /><span>Đặt hàng</span></Button>


                </Card.Body>
            </Card>
        </div>
    );
};

export default CartItem;
