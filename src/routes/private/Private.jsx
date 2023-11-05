import React, { useContext } from 'react';
import { Route, redirect, Outlet, Navigate } from 'react-router-dom';
import StoreContext from './../../context/StoreContext';

const PrivateRouter = () => {
    const { token } = useContext(StoreContext);

    return token ? <Outlet /> : <Navigate to="/login" />;


}

export default PrivateRouter;