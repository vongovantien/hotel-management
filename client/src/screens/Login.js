import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../redux/actions/UserAction";
import { GoogleLogin } from "react-google-login";

const clientID =
    "468452925173-9jitj8iaej5v8rhr4l81v87tmbov403i.apps.googleusercontent.com";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const redirect = useSearchParams();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const onSuccess = (res) => {
        console.log("Login Success " + res.profileObj);
    };
    const onFailure = (res) => {
        console.log("Login fail" + res);
    };
    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    // const handleLogin = async (googleData) => {
    //     const res = await fetch("/api/v1/auth/google", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             token: googleData.tokenId,
    //         }),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    //     const data = await res.json();
    //     console.log(data);
    // };

    return (
        <>
            <GoogleLogin
                clientId={clientID}
                buttonText="Login with google"
                isSignedIn={true}
                onSuccess={onSuccess}
                onFailure={onFailure}
                style={{ marginTop: "100px" }}
                cookiePolicy={'single_host_origin'}
            />
            {error && <h1 className="text-danger">{error}</h1>}
            {loading && <span>Loading...</span>}
            <Container fluid="md" className="mt-5">
                <Card className="p-4 mx-auto" style={{ width: "36rem" }}>
                    <Form onSubmit={submitHandler}>
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

export default Login;
