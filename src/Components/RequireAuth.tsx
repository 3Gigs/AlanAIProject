import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
    const [isAuth, setIsAuth] = useState(false);
    let location = useLocation();

    useEffect(() => {
        setIsAuth(getAuth() ? true : false);
    }, [isAuth]);

    if(!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

  return children;
}
