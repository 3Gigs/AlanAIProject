import { useEffect, useState } from "react";
import "../Scss/dropdown.scss";

interface Props {
  toggle: JSX.Element;
  children: JSX.Element;
}

function DropDown ({ toggle, children }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.onclick = (e) => {
      if ((e as any)?.target?.parentElement?.id === "ToggleButton" ||
        (e?.target as any)?.parentElement?.id === "DropDownMenu") {
        setVisible(true);
      } else {
        console.log((e?.target as any)?.parentElement?.id === "DropDownMenu");
        setVisible(false);
      }
    };
  }, []);

  function show () {
    if (!visible) {
      setVisible(true);
    }
  }

  return (
    <div id="DropDown">
      <button id="ToggleButton" onClick={show}>{ toggle }</button>
      { visible
        ? <div id="DropDownMenu">
            { children }
          </div>
        : <div></div>
      }
    </div>
  );
}

export default DropDown;
