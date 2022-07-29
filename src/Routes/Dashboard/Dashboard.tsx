import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Navigate, useLocation } from 'react-router-dom'
import AlanCalendar from '../../Calendar/calendar';
import Appointments from '../../Calendar/appointments';

function Dashboard() {
  return (
    <div className="App">
      <Appointments />
      <AlanCalendar />
    </div>
  );
}

export default Dashboard;