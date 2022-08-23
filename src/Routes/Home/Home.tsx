import { AlanButton } from "@alan-ai/alan-sdk-web/dist/AlanButton";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAlanBtn } from "../../App";
import { ThemeContext } from "../../Providers/ThemeProvider";
import "../../Scss/home.scss";

function Home () {
  const location = useLocation();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    initAlanBtn();
    ((window as any).alanBtnInstance as AlanButton).setVisualState({ screen: "Home" });
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
    <main className="Home">
      <div className="Hero" >
        <div className="PromoText">
          <header>
            <h1 className="PromoText_1">Alan Appointments</h1>
            <h2 className="PromoText_2">Simple scheduling with Alan AI</h2>
          </header>
          <div className="PromoStart">
            <h4 className="GetStarted">Get started</h4>
            <p>Click on <span style={{ color: "lightcyan" }}>bottom right button</span> and say <span style={{ color: "lightsalmon" }}>&quot;Get started&quot;</span></p>
          </div>
          <div className="CreditText">
            <h1 className="BottomText_Header">Project created by</h1>
            <p className="BottomText_Credits">Huaxuan Y.</p>
            <p className="BottomText_Credits">Yinuo C.</p>
          </div>
        </div>
        <img className="PromoArt" src="/assets/promoart.svg" alt="Promo Art" />
      </div>
    </main>
  );
}

export default Home;
