import React from "react";
import { ToastContainer, toast } from "react-toastify";
const Toast = () => {
    return (
        <ToastContainer
            position="top-right"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
        ></ToastContainer>
    );
};

export default Toast;
