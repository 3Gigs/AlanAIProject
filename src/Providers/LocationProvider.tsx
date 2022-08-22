import { AlanButton } from "@alan-ai/alan-sdk-web/dist/AlanButton";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function LocationProvider ({ children }: { children: JSX.Element }) {
  const pathName = useLocation();
  const [location, setLocation] = useState("");

  useEffect(() => {
    switch (pathName.pathname) {
      case "/":
        setLocation("Home");
        break;
      case "/dashboard":
        setLocation("Dashboard");
        break;
      default:
        throw new Error("Invalid pathname!");
    }
  }, [pathName]);

  useEffect(() => {
    if ((window as any).alanBtnInstance) {
      ((window as any).alanBtnInstance as AlanButton).setVisualState({ screen: location });
    }
  }, [location]);

  return (
    <Fragment>
      { children }
    </Fragment>
  );
}

export default LocationProvider;
