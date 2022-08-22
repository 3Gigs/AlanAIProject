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
        (e?.target as any)?.parentElement?.id === "DropDownMenu" ||
        (e?.target as any)?.id === "ToggleButton") {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
  }, []);

  return (
    <div id="DropDown">
      <button id="ToggleButton">{ toggle }</button>
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
