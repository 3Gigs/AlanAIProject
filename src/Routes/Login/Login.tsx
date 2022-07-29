import React from 'react';
import { useLocation, Navigate } from 'react-router-dom'

function Login() {
    let isAuth = false;

    return (
        isAuth
            ? <Navigate to="/dashboard" /> :
            <h1>You're at login page!</h1>
    )
}

export default Login;