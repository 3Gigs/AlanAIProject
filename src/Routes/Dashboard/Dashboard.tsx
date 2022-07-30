import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
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