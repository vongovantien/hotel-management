import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteProduct,
    listProduct,
    createProduct,
} from "../../redux/actions/ProductActions";

const Product = () => {
    const dispatch = useDispatch();

    const productsList = useSelector((state) => state.productList);
    const { loading, error, products } = productsList;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = products?.pages;

    const [perPage, setPerPage] = useState(5);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newPost, setNewPost] = useState({
        name: "",
        price: "",
        countInStock: "",
    });
    const image = useRef();

    const change = (obj) => {
        setNewPost({
            ...newPost,
            ...obj,
        });
    };
    const handleDelete = async (id) => {
        await dispatch(deleteProduct(id));
        await dispatch(listProduct({ currentPage, perPage }));
    };

    const handleSubmit = async () => {
        let data = new FormData();
        data.append("name", newPost.name);
        data.append("price", newPost.price);
        data.append("countInStock", newPost.countInStock);
        data.append("image", image.current.files[0]);

        const res = await dispatch(createProduct(data));
    };

    const fetchListProducts = async () => {
        const payload = {
            currentPage: currentPage,
            perPage: perPage,
        };
        await dispatch(listProduct(payload));
    };

    const handlePrevClick = () => {
        setCurrentPage((prev) => prev - 1);
    };
    const handleNextClick = () => {
        setCurrentPage((prev) => prev + 1);
    };
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageClick(number)}
            >
                {number}
            </Pagination.Item>
        );
    }
    useEffect(() => {
        fetchListProducts(currentPage, perPage);
    }, [currentPage, perPage]);
    return (
        <>
            {loading ? (
                <p>Loading....</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <Button variant="primary" onClick={handleShow}>
                        Thêm mới sản phẩm
                    </Button>
                    <br />
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm mới sản phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control
                                        type="name"
                                        autoFocus
                                        value={newPost.name}
                                        onChange={(e) =>
                                            change({ name: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Giá tiền</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={newPost.price}
                                        onChange={(e) =>
                                            change({ price: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Số lượng trong kho</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newPost.countInStock}
                                        onChange={(e) =>
                                            change({
                                                countInStock: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicEmail"
                                >
                                    <Form.Label>Hình ảnh</Form.Label>
                                    <Form.Control type="file" ref={image} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Hủy
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                Thêm mới
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <br />
                    <Form.Select
                        aria-label="Số lượng phần tử"
                        value={perPage}
                        onChange={(e) => setPerPage(e.target.value)}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </Form.Select>
                    <br />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá tiền</th>
                                <th>Miêu tả</th>
                                <th>Số lượng trong kho</th>
                                <th>Đánh giá</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products &&
                                products.result?.length > 0 &&
                                products.result.map((item, key) => (
                                    <tr key={item._id}>
                                        <td>{key + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.description}</td>
                                        <td>{item.countInStock}</td>
                                        <td>{item.rating}</td>
                                        <td>
                                            <img
                                                style={{
                                                    width: "150px",
                                                    height: "150px",
                                                }}
                                                src={item.image}
                                                alt={item.name}
                                            />
                                        </td>
                                        <td>
                                            <Button variant="outline-success">
                                                <AiFillEdit />
                                            </Button>
                                            &nbsp;
                                            <Button
                                                variant="outline-danger"
                                                onClick={() =>
                                                    handleDelete(item._id)
                                                }
                                            >
                                                <AiFillDelete />
                                            </Button>
                                            &nbsp;
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>

                    <Pagination>
                        <Pagination.First
                            onClick={handlePrevClick}
                            disabled={currentPage === 1}
                        />
                        {items}
                        <Pagination.Last
                            onClick={handleNextClick}
                            disabled={currentPage === products?.pages}
                        />
                    </Pagination>
                </>
            )}
        </>
    );
};

export default Product;
