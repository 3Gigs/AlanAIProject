import { BrowserRouter, Routes, Route } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
import Home from "./Routes/Home/Home";
import Dashboard from "./Routes/Dashboard/Dashboard";
import Login from "./Routes/Login/Login";
import Logout from "./Routes/Logout/Logout";
import Navi from "./Routes/Navbar/Navi";
import { ICalendarEvent } from "./Components/calendar";
import "bootstrap/dist/css/bootstrap.min.css";

export const initAlanBtn = () => {
  if (!(window as any).alanBtnInstance) {
    (window as any).alanBtnInstance = alanBtn({
      key: "9c762b628a6087547b2d24cde198197c2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData: any) => {
        switch (commandData.command) {
          case "navigate:Dashboard":
            window.location.pathname = "/dashboard";
            break;
          case "navigate:Home":
            window.location.pathname = "/";
            break;
          case "navigate:SignIn":
            window.location.pathname = "/login";
            break;
          case "go:Back":
            history.back();
            break;
          case "createEvent":
            console.log(commandData.eventInfo);
            document.dispatchEvent(new CustomEvent<ICalendarEvent>("calendarCreateEvent", { detail: commandData.eventInfo }));
            break;
          case "viewEvent":
            document.dispatchEvent(new CustomEvent("calendarViewEvent", { detail: commandData.title }));
            break;
          case "closeEvent":
            document.dispatchEvent(new Event("calendarCloseEvent"));
            break;
          case "deleteEvent":
            document.dispatchEvent(new Event("calendarDeleteEvent"));
            break;
          default:
        }
      }
    });
  }
};

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navi />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
