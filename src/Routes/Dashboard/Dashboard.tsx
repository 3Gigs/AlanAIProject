import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Navigate } from 'react-router-dom';
import AlanCalendar from '../../Components/calendar';
import Appointments from '../../Components/appointments';
import { firebaseApp } from "../../main";
import { getAuth } from "firebase/auth";

function Dashboard() {
  const auth = getAuth(firebaseApp);
  const isAuth = auth?.currentUser;
  console.log(isAuth);

  return (
    isAuth ?
      <div className="App">
        <Appointments />
        <AlanCalendar />
      </div> :
      <Navigate to="/login" />
  );
}

export default Dashboard;