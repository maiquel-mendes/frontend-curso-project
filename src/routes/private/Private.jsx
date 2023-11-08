import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import StoreContext from './../../context/StoreContext';

const PrivateRouter = () => {
  const { token } = React.useContext(StoreContext);

  return token ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRouter;
