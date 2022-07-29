import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Route, Navigate, useLocation } from 'react-router-dom'
import AlanCalendar from '../../Components/calendar';
import Appointments from '../../Components/appointments';
import { getAuth } from "firebase/auth";

function Dashboard() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(getAuth() ? true : false);
    }, [isAuth]);

    if(getAuth() !== null) {
        return (
          <div className="App">
            <Appointments />
            <AlanCalendar />
          </div>
        )
    }
    else {
      return <Navigate to="/login" />
    }
}

export default Dashboard;