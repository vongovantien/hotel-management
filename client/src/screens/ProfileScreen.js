import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/UserAction";

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            dispatch(getUserDetails(userInfo._id));
        }
    }, []);

    return <div>{userInfo}</div>;
};

export default ProfileScreen;
