import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Navigate, useLocation } from 'react-router-dom'
import AlanCalendar from '../../Components/calendar';
import Appointments from '../../Components/appointments';

function Dashboard() {
  return (
    <div className="App">
      <Appointments />
      <AlanCalendar />
    </div>
  );
}

export default Dashboard;