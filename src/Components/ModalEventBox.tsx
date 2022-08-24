import { useContext } from "react";
import { ThemeContext } from "../Providers/ThemeProvider";
import { useAppDispatch } from "../reduxStore";
import { ICalendarEvent } from "./Calendar";
import { deleteEvent } from "./calendarSlice";

interface Props {
    visible: boolean;
    event: ICalendarEvent;
    // eslint-disable-next-line no-undef
    onCloseClick: () => void;
}

function ModalEventBox ({ visible, event, onCloseClick }: Props) {
  const dateStart = new Date(event.start);
  const dateEnd = new Date(event.end);
  const dispatch = useAppDispatch();
  const themeMode = useContext(ThemeContext);

  function handleClickDelete () {
    onCloseClick();
    dispatch(deleteEvent(event.id));
  }

  return (
    <div className="Modal" style={{ display: visible ? "inline" : "none" }}>
      <div className={themeMode === "dark" ? "EventManageBox_Modal_Dark" : "EventManageBox_Modal_Light"}>
          <div className="EventManagerActionMenu">
              <span onClick={handleClickDelete} className="EventManagerActionButton material-symbols-outlined">
                  delete
              </span>
              <span onClick={onCloseClick} className="EventManagerActionButton material-symbols-outlined">
                  close
              </span>
          </div>
          <div>
            <h2>{event.title}</h2>
            <div>
                <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill icon-right-spacing" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    </svg>
                    Start
                </h4>
                <p>{dateStart.toLocaleDateString() + " " + dateStart.toLocaleTimeString()}</p>
                <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill icon-right-spacing" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    </svg>
                    End
                </h4>
                <p>{dateEnd.toLocaleDateString() + " " + dateEnd.toLocaleTimeString()}</p>
            </div>
            <div className="EventBoxAlan">
              <h4>🗺️ Navigate with Alan AI️</h4>
              <p>❌ Say <b>&quot;close&quot;, &quot;got it&quot;, &quot;thank you&quot;</b> to <b><span style={{ color: "#e06666" }}>close</span></b> this box</p>
              <p>🗑️ Say <b>&quot;delete this event&quot;</b> to <b><span style={{ color: "#e06666" }}>delete</span></b> event</p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default ModalEventBox;
