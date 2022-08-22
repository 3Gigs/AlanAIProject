import { AlanButton } from "@alan-ai/alan-sdk-web/dist/AlanButton";
import { useEffect } from "react";
import { initAlanBtn } from "../../App";
import "../../Scss/home.scss";

function Home () {
  useEffect(() => {
    initAlanBtn();
    ((window as any).alanBtnInstance as AlanButton).setVisualState({ screen: "Home" });
  }, []);

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
