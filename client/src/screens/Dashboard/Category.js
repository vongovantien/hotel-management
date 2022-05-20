import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Pagination, Table } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategory, listCategories } from '../../redux/actions/DashboardAction';
import { AiFillEdit, AiFillDelete, AiOutlineInfoCircle } from "react-icons/ai";
import ActionModal from '../../components/SharedComponent/Modal/ActionModal';
const Category = () => {
    const dispatch = useDispatch();

    const categoriesList = useSelector((state) => state.categoriesList);
    const { loading, error, categories } = categoriesList;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");

    const handleDelete = async (id) => {
        await dispatch(deleteCategory(id));
        await dispatch(listCategories());
    }

    const onValueChange = (event) => {
        console.log(event.value)
        console.log(event.id)

    }

    const handleSubmit = async () => {
        const res = await dispatch(createCategory(productName, productType));
        console.log('res', res)
        setShow(false);
        toast("Thêm mới loại sản phẩm thành công!");
        await dispatch(listCategories());
        setProductName("");
        setProductType("")
    }

    const fetchListCategories = async () => {
        await dispatch(listCategories());
    }
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }
    useEffect(() => {
        fetchListCategories();
    }, [])


    return (
        <>
            <ActionModal onValueChange={onValueChange} formControl={[{ label: productName, value: productType }]} show={show} handleClose={handleClose} />
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
                    {/* <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm mới loại sản phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Tên loại sản phẩm</Form.Label>
                                    <Form.Control
                                        type="name"
                                        autoFocus
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Kiểu dáng</Form.Label>
                                    <Form.Control
                                        type="productType"
                                        value={productType}
                                        onChange={(e) => setProductType(e.target.value)}
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
                    </Modal> */}
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
                            {categories && categories.result?.length > 0 && categories.result.map((item, key) =>
                                <tr key={item._id}>
                                    <td>{key + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.productType}</td>
                                    <td>
                                        <Button variant="outline-success"><AiFillEdit /></Button>&nbsp;
                                        <Button variant="outline-danger" onClick={() => handleDelete(item._id)}><AiFillDelete /></Button>&nbsp;
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>

                    <Pagination>
                        <Pagination.First />
                        {items}
                        <Pagination.Last />
                    </Pagination>
                </>
            )}
        </>

    )
}

export default Category