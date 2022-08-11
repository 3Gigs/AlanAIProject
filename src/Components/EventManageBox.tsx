import { useAppDispatch } from "../reduxStore";
import { ICalendarEvent } from "./Calendar";
import { deleteEvent } from "./calendarSlice";

interface Props {
    visible: boolean;
    x: number;
    y: number;
    event: ICalendarEvent;
    // eslint-disable-next-line no-undef
    onCloseClick: () => void;
}

function EventManageBox ({ visible, x, y, event, onCloseClick }: Props) {
  const dateStart = new Date(event.start);
  const dateEnd = new Date(event.end);
  const dispatch = useAppDispatch();

  function handleClickDelete () {
    onCloseClick();
    dispatch(deleteEvent(event.id));
  }

  return (
        <div className="EventManageBox_Click" style={{ display: visible ? "inline" : "none", left: x, top: y - 50 }}>
            <div className="EventManagerActionMenu">
                <span onClick={handleClickDelete} className="EventManagerActionButton material-symbols-outlined">
                    delete
                </span>
                <span onClick={onCloseClick} className="EventManagerActionButton material-symbols-outlined">
                    close
                </span>
            </div>
            <h3>{event.title}</h3>
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
        </div>
  );
}

export default EventManageBox;
