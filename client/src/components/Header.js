import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import logo from "../public/logo.svg";
import "./Header.css";
const Header = () => {
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
                <div className="d-flex align-items-center">
                    <Button variant="danger">Register</Button>
                    &nbsp;
                    <Button variant="danger">Login</Button>
                </div>
            </div>
        </div>
    );
};

export default Header;
