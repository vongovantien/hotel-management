import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'


const data = [
    {
        id: 1,
        title: 'Thống kê số lượng sản phẩm trong kho',
        url: "/admin/cate-stats",
    },
    {
        id: 2,
        title: 'Thống kê số lượng sản phẩm đã bán',
        url: "/admin/product-stats",
    },
    {
        id: 3,
        title: 'Thống kê số lượng số lượng đơn đặt hàng',
        url: "/admin/order-stats",
    },
]
const NavBar = () => {
    return (
        <Nav Nav fill variant="tabs" defaultActiveKey="/admin" >
            {data.map((item) =>
                <Nav.Item >
                    <Link to={item.url} className="nav-link">{item.title}</Link>
                </Nav.Item>
            )
            }
        </Nav >
    )
}

export default NavBar