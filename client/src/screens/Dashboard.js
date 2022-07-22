import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { Link, Outlet } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Product from "./Dashboard/Product";
import Category from "./Dashboard/Category";
import Stats from "../components/Stats";

const Dashboard = () => {
    const [currrentTab, setCurrentTab] = useState("category");

    const fetchTabContent = () => {
        switch (currrentTab) {
            case "category":
                return <Category />;
            case "product":
                return <Product />;
            case "product-stats":
                return < Stats />;
            default:
                return null;
        }
    };

    useEffect(() => { }, [currrentTab]);

    return (
        <div className="container">
            <h1 className="text-center text-danger">
                Welcome to Dashboard Page
            </h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="flex-column">
                        <p
                            className={`nav-link ${currrentTab === "category" ? "text-danger" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setCurrentTab("category")}
                        >
                            Quản lí loại sản phẩm
                        </p>
                        <p
                            className={`nav-link ${currrentTab === "product" ? "text-danger" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setCurrentTab("product")}
                        >
                            Quản lí sản phẩm
                        </p>
                        <p
                            className={`nav-link ${currrentTab === "product-stats" ? "text-danger" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setCurrentTab("product-stats")}
                        >
                            Thống kê theo sản phẩm
                        </p>
                    </div>
                </div>
                <div className="col-md-8">
                    {fetchTabContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
