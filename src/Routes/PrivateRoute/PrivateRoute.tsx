import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import Login from '../Login/Login';
import { firebaseApp } from '../../main';
import { getAuth } from "firebase/auth";

interface Props {
    RouteComponent: React.ComponentType;
    path?: string;
}

function PrivateRoute({ RouteComponent }: Props) {
    const isAuth = sessionStorage.getItem('AlanAIAuthToken') ? true : false;

    if(isAuth) {
        alert(isAuth);
        return <RouteComponent />
    }
    else {
        return <Login />
    }
}

export default PrivateRoute;