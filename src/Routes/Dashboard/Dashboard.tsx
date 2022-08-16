import { Navigate, useLocation } from "react-router-dom";
import AlanCalendar from "../../Components/Calendar";
import Appointments from "../../Components/ApptSidebar";
import { firebaseApp } from "../../main";
import { getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import { AlanButton } from "@alan-ai/alan-sdk-web/dist/AlanButton";
import { initAlanBtn } from "../../App";
import "../../Scss/dashboard.scss";
import { ThemeContext } from "../../Providers/ThemeProvider";

function Dashboard () {
  const auth = getAuth(firebaseApp);
  const isAuth = auth?.currentUser;
  const location = useLocation();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    initAlanBtn();
    ((window as any).alanBtnInstance as AlanButton).setVisualState({ screen: "Dashboard" });
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("Background_Dark");
      document.body.classList.add("Background_Light");
    } else if (theme === "dark") {
      document.body.classList.remove("Background_Light");
      document.body.classList.add("Background_Dark");
    }

    return function cleanup () {
      document.body.classList.remove("Background_Dark");
      document.body.classList.remove("Background_Light");
    };
  }, [location, theme]);

  return (
    isAuth
      ? <div className={theme === "light" ? "Dashboard_Light" : "Dashboard_Dark"}>
        <AlanCalendar />
        <Appointments />
      </div>
      : <Navigate to="/login" />
  );
}

export default Dashboard;
