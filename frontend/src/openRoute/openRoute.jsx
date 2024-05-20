import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function OpenRoute({children}){
    const token = useSelector((state) => state.auth.token)
    console.log("open route token",token)

    if(token === "null"){
        return children;
    }else{
        return <Navigate to="/Home"/>;
    }
}
export default OpenRoute;