import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

export function RequireAuth({ children }: { children: JSX.Element }) {
  let isAuth = false;
  let location = useLocation();

  if(!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
}
