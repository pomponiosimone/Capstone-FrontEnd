import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateAdmin = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        
        return <Navigate to="/loginAdmin" replace />;
    }
    return children;
};

export default PrivateAdmin;