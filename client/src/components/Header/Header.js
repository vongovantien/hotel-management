import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.svg";
import "./Header.css";
import { logout } from "../../redux/actions/UserAction";
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout);
        navigate("/login");
    };
    return (
        <div className="container py-3">
            <div className="header-main">
                <Link to="/" className="nav-link">
                    <img
                        className="img logo"
                        style={{ width: "56px", height: "56px" }}
                        src={logo}
                        alt="logo"
                    />
                    <span className="ms-2 text-brand">VT STORE</span>
                </Link>
                <ul className="nav header-items">
                    <li className="nav-item">Home</li>
                    <li className="nav-item">Product</li>
                    <li className="nav-item">About</li>
                    <li className="nav-item">Contact</li>
                </ul>
                {userInfo ? (
                    <Dropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-basic">
                            Hi {userInfo.name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link to="/profile">Profile</Link>
                            <Link to="#" onClick={logoutHandler}>
                                Logout
                            </Link>

                            <Dropdown.Item href="#/action-2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                                Something else
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <div className="d-flex align-items-center">
                        <Link to="/login">
                            <Button variant="danger">Login</Button>
                        </Link>
                        &nbsp;
                        <Link to="/register">
                            <Button variant="danger">Register</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
