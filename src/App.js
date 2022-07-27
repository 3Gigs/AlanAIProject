import './App.css';
import React, {useState, useEffect} from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import Calendar from './Calendar/calendar'

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

  function handleClick(arg) {
    alert(arg.dateStr)
    console.log("Clicked!")
  }

  return (
    <Calendar />
  );
}

export default App;

