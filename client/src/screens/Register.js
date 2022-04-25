import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/UserAction";
import { Link, useNavigate } from "react-router-dom";
const Register = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));
    };

    useEffect(() => {
        if (userInfo) {
            navigate("/login");
        }
    }, [userInfo]);

    return (
        <>
            {error && <h1 className="text-danger">{error}</h1>}
            {loading && <span>Loading...</span>}
            <Container fluid="md" className="mt-5">
                <Card className="p-4 mx-auto" style={{ width: "36rem" }}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <br />
                        <Link to="/register">Create a account</Link>
                    </Form>
                </Card>
            </Container>
        </>
    );
};

export default Register;