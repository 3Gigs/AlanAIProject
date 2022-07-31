import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Navigate } from 'react-router-dom';
import AlanCalendar from '../../Components/calendar';
import Appointments from '../../Components/appointments';

function Dashboard() {
  const isAuth = sessionStorage.getItem('AlanAIAuthToken') ? true : false;

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