import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';
import Home from "./Routes/Home/Home";
import Dashboard from "./Routes/Dashboard/Dashboard";
import Login from "./Routes/Login/Login";
import Navi from "./Routes/Navbar/Navi";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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
    <BrowserRouter>
      <Routes>
        <Route element={<Navi />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
