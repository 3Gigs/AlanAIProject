import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useAppDispatch } from "../reduxStore";
import { ICalendarEvent } from "./calendar";
import { deleteEvent } from "./calendarSlice";

interface Props {
    visible: boolean;
    x: number;
    y: number;
    event: ICalendarEvent;
    // eslint-disable-next-line no-undef
    calendarRef: React.MutableRefObject<FullCalendar>;
}

function EventManageBox ({ visible, x, y, event, calendarRef }: Props) {
  const [isVisible, setIsVisible] = useState(visible);
  const dateStart = new Date(event.start);
  const dateEnd = new Date(event.end);
  const dispatch = useAppDispatch();

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
            <h2>{event.title}</h2>
            <div>
                <h5>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill icon-right-spacing" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    </svg>
                    Start
                </h5>
                <p>{dateStart.toLocaleDateString() + " " + dateStart.toLocaleTimeString()}</p>
                <h5>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill icon-right-spacing" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    </svg>
                    End
                </h5>
                <p>{dateEnd.toLocaleDateString() + " " + dateEnd.toLocaleTimeString()}</p>
            </div>
            <Button variant="danger" onClick={() => {
              dispatch(deleteEvent(event.id));
            }}>Delete</Button>
        </div>
  );
}

export default EventManageBox;
