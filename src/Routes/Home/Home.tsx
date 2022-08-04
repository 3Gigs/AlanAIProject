import { AlanButton } from "@alan-ai/alan-sdk-web/dist/AlanButton";
import { useEffect } from "react";
import { initAlanBtn } from "../../App";

function Home () {
  useEffect(() => {
    initAlanBtn();
    ((window as any).alanBtnInstance as AlanButton).setVisualState({ screen: "Home" });
  }, []);

  return (
        <div className="Home">
            <div className="Hero" >
                <div className="PromoText">
                    <h1 className="PromoText_1">Alan Appointments</h1>
                    <h1 className="PromoText_2">Simple scheduling with Alan AI</h1>
                    <div className="PromoStart">
                        <h4 className="GetStarted">Get started</h4>
                        <h4>Click on <span style={{ color: "lightcyan" }}>bottom right button</span> and say <span style={{ color: "lightsalmon" }}>&quot;Get started&quot;</span></h4>
                    </div>
                </div>
                <div className="PromoArt">
                    <img className="PromoArt_Clock" src="/assets/promo_clock.svg" />
                    <img className="PromoArt_Calendar" src="/assets/calendar_home.svg" />
                    <img className="PromoArt_Mic" src="/assets/microphone.svg" />
                </div>
            </div>
            <div className="BottomText">
                <h1 className="BottomText_Header">Project created by</h1>
                <h4 className="BottomText_Credits">Huaxuan Y.</h4>
                <h4 className="BottomText_Credits">Yinuo C.</h4>
            </div>
        </div>
  );
}

export default Home;
