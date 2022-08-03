import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { ICalendarEvent } from "./calendar";

interface Props {
    visible: boolean;
    x: number;
    y: number;
    event: ICalendarEvent;
}

function EventManageBox ({ visible, x, y, event }: Props) {
  const [isVisible, setIsVisible] = useState(visible);

  function handleClick () {
    setIsVisible(false);
  }

  return (
        <div className="EventManageBox" style={{ display: isVisible ? "block" : "none", left: x, top: y - 50 }}>
            <div className="EventManagerActionMenu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" onClick={handleClick} className="closeButton bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
            <h2>Event Manager</h2>
            <div>
                <h5>Event Info</h5>
                <h6>{event.title}</h6>
                <h5>Event Start</h5>
                <h6>{event.start}</h6>
                <h5>Event End</h5>
                <h6>{event.end}</h6>
            </div>
            <Button>Test</Button>
        </div>
  );
}

export default EventManageBox;
