import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar';
import { Link, Outlet } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Product from './Dashboard/Product';
import Category from './Dashboard/Category';


const Dashboard = () => {
    const [currrentTab, setCurrentTab] = useState('category')

    const fetchTabContent = () => {
        switch (currrentTab) {
            case 'category':
                return (
                    <Product title={'abc'} title2={"123"}/>
                )
            case 'product':
                return (
                    <Product title={'def'} />
                )
            default:
                return null
        }
    }

    useEffect(() => {

    }, [currrentTab])

    return (
        <div className='container'>
            <h1 className='text-center text-danger'>Welcome to Dashboard Page</h1>
            <div className='row'>
                <div className="col-md-4">
                    <div className="flex-column">
                        <p className="nav-link" onClick={() => setCurrentTab('category')}>Quản lí loại sản phẩm</p>
                        <p className="nav-link" onClick={() => setCurrentTab('product')}>Quản lí sản phẩm</p>
                    </div>
                </div>
                <div className="col-md-8">
                    {/* {fetchTabContent()} */}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard