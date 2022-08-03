import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../redux/actions/UserAction";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
}).required();

const clientID =
    "468452925173-9jitj8iaej5v8rhr4l81v87tmbov403i.apps.googleusercontent.com";
const Login = () => {

    const { control, register, handleSubmit, formState: { errors }, getValues, setError } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log('data', data)

    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const redirect = useSearchParams();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <>
            {error && <h1 className="text-danger">{error}</h1>}
            {loading && <span>Loading...</span>}
            <Container fluid="md" className="mt-5">
                <Card className="p-4 mx-auto" style={{ width: "36rem" }}>
                    <Form onSubmit={handleSubmit(data => console.log(data))}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Controller control={control} name="username"
                                defaultValue=""
                                render={({ field: { onChange, onBlur, name, value, ref } }) => (
                                    <Form.Control type='email' onBlur={onBlur} onChange={onChange} value={value} ref={ref}
                                        isInvalid={errors.username}
                                        placeholder="Enter user name" />)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Controller control={control} name="password"
                                defaultValue=""
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Form.Control type='password' onBlur={onBlur} onChange={onChange} value={value} ref={ref}
                                        isInvalid={errors.password}
                                        placeholder="Enter user name" />)} />
                        </Form.Group>
                        <input type="submit" />
                        <br />
                        <Link to="/register">Create a account</Link>
                    </Form>
                </Card>
            </Container>
        </>
    );
};

export default Login;
