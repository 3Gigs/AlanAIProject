import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import "../App.css";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../reduxStore";
import { getEventsThunk } from "./calendarSlice";

export interface ICalendarEvent {
  end: string;
  id: string;
  start: string;
  title: string;
}

export function isCalendarEvent (obj: unknown): obj is ICalendarEvent {
  const event = obj as ICalendarEvent;
  return (
    event.end !== undefined &&
    event.id !== undefined &&
    event.start !== undefined &&
    event.title !== undefined
  );
}

function Calendar () {
  const events = useAppSelector((state) => state.calendarTest.value);
  const eventsDispatch = useAppDispatch();
  const calendarRef = useRef() as any;

  useEffect(() => {
    eventsDispatch(getEventsThunk());
  }, []);

  function handleClick (arg: any) {
    // dispatch(addEvent());
    // dispatch(deleteEvent());
  }

  function handleEventClick (arg: any) {
    alert("Event clicked!");
    // console.log(arg);
    // const calApi = calendarRef.current.getApi();
    // const id = arg.event._def.publicId;

    arg.event.remove();
  }

  return (
    <div className={"Calendar w-100"}>
      <FullCalendar
        headerToolbar={{ start: "dayGridMonth,dayGridWeek,today", center: "title", end: "prev next" }}
        plugins={[dayGridPlugin, interactionPlugin]}
        ref={calendarRef}
        initialView="dayGridMonth"
        height={"95%"}
        events={events}
        dateClick={handleClick}
        eventClick={handleEventClick}
      />
    </div>
  );
}

export default Calendar;
