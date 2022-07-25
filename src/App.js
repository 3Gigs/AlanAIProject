import './App.css';
import React, {useState, useEffect} from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import Button from '@mui/material/Button';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  useEffect(() => {
    alanBtn({
        key: 'c8fedc2d2a8f2e45c88976e9550ffd182e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: (commandData) => {
          if (commandData.command === 'go:back') {
            // Call the client code that will react to the received command
          }
        }
    });

  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <CalendarPicker></CalendarPicker>
    </LocalizationProvider>
  );
}

export default App;

