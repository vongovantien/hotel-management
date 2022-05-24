import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    createCategory,
    deleteCategory,
    listCategories,
    singleProduct,
    updateCategory,
} from "../../redux/actions/DashboardAction";
import { AiFillEdit, AiFillDelete, AiOutlineInfoCircle } from "react-icons/ai";
import ActionModal from "../../components/SharedComponent/Modal/ActionModal";
const Category = () => {
    const dispatch = useDispatch();

    const categoriesList = useSelector((state) => state.categoriesList);
    const { loading, error, categories } = categoriesList;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = categories?.pages;

    const [perPage, setPerPage] = useState(5);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [categoryName, setCategoryName] = useState("");
    const [productType, setProductType] = useState("");

    const handleDelete = async (id) => {
        await dispatch(deleteCategory(id));
        await dispatch(listCategories({ currentPage, perPage }));
    };
    const handleEdit = async (id, data) => {
        setShow(!show);
        await dispatch(singleProduct(id))
        await dispatch(updateCategory(id, data))
        await dispatch(listCategories({ currentPage, perPage }));
    };

    const handleSubmit = async () => {
        const res = await dispatch(createCategory(categoryName, productType));
        console.log(res);
        // if (res.success === false) {
        //     for (let i = 0; i < res.errors.length; i++) {
        //         toast(i.msg);
        //     }
        // }
        // if (res.success === true) {
        //     setShow(false);
        //     toast("Thêm mới loại sản phẩm thành công!");
        //     await dispatch(listCategories());
        //     setProductName("");
        //     setProductType("");
        // }
    };

    const fetchListCategories = async () => {
        const payload = {
            currentPage: currentPage,
            perPage: perPage,
        };
        await dispatch(listCategories(payload));
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
        fetchListCategories(currentPage, perPage);
    }, [currentPage, perPage]);

    return (
        <>
            {/* <ActionModal onValueChange={onValueChange} formControl={[{ label: productName, value: productType }]} show={show} handleClose={handleClose} /> */}
            <ToastContainer />
            {loading ? (
                <p>Loading....</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <Button variant="primary" onClick={handleShow}>
                        Thêm mới loại sản phẩm
                    </Button>
                    <br />
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm mới loại sản phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Tên loại sản phẩm</Form.Label>
                                    <Form.Control
                                        type="name"
                                        autoFocus
                                        value={categoryName}
                                        onChange={(e) =>
                                            setCategoryName(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Kiểu dáng</Form.Label>
                                    <Form.Control
                                        type="productType"
                                        value={productType}
                                        onChange={(e) =>
                                            setProductType(e.target.value)
                                        }
                                    />
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
                                <th>Tên loại sản phẩm</th>
                                <th>Kiểu dáng</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories &&
                                categories.result?.length > 0 &&
                                categories.result.map((item, key) => (
                                    <tr key={item._id}>
                                        <td>{key + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.productType}</td>
                                        <td>
                                            <Button
                                                variant="outline-success"
                                                onClick={() =>
                                                    handleEdit(item._id)
                                                }
                                            >
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
                            disabled={currentPage === categories.pages}
                        />
                    </Pagination>
                </>
            )}
        </>
    );
};

export default Category;
