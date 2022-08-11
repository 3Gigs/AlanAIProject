import { Navigate } from "react-router-dom";
import AlanCalendar from "../../Components/Calendar";
import Appointments from "../../Components/ApptSidebar";
import { firebaseApp } from "../../main";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { AlanButton } from "@alan-ai/alan-sdk-web/dist/AlanButton";
import { initAlanBtn } from "../../App";
import "../../Scss/dashboard.scss";

function Dashboard () {
  const auth = getAuth(firebaseApp);
  const isAuth = auth?.currentUser;

  useEffect(() => {
    initAlanBtn();
    ((window as any).alanBtnInstance as AlanButton).setVisualState({ screen: "Dashboard" });
  }, []);

  return (
    isAuth
      ? <div className="Dashboard">
        <Appointments />
        <AlanCalendar />
      </div>
      : <Navigate to="/login" />
  );
}

export default Dashboard;
