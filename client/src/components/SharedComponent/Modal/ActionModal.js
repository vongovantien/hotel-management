import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'


const ActionModal = ({ formControl = [], show, handleClose, onValueChange }) => {
    console.log(show)
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm mới loại sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="form1">
                        <Form.Label>{formControl.label}</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            value={formControl.label}
                            onChange={(e) => onValueChange(e.target)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="form2">
                        <Form.Label>{formControl.value}</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            value={formControl.value}
                            onChange={(e) => onValueChange(e.target)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={() => { }}>
                    Thêm mới
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ActionModal