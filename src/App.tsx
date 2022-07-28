import { useState, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import reactLogo from './assets/react.svg';
import AlanCalendar from './Calendar/calendar';
import Appointments from './Calendar/appointments';

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    alanBtn({
        key: 'c8fedc2d2a8f2e45c88976e9550ffd182e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: (commandData: any) => {
          if (commandData.command === 'go:back') {
            // Call the client code that will react to the received command
          }
        }
      });
    });

  return (
    <div className="App">
      <Appointments />
      <AlanCalendar />
    </div>
  )
}

export default App
