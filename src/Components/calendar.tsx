import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import "../App.css";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../reduxStore";
import { getEventsThunk } from "./calendarSlice";
import EventManageBox from "./EventManageBox";
import { uuidv4 } from "@firebase/util";

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

  const [eventManagerVisible, setEventManagerVisible] = useState(false);
  const [eventManagerX, setEventManagerX] = useState(0);
  const [eventManagerY, setEventManagerY] = useState(0);
  const [currentEventInfo, setCurrentEventInfo] = useState({ id: "", title: "", start: "", end: "" });

  useEffect(() => {
    eventsDispatch(getEventsThunk());
  }, []);

  function handleClick (arg: any) {
    // dispatch(addEvent());
    // dispatch(deleteEvent());
  }

  function handleEventClick (arg: any) {
    // console.log(arg);
    // const calApi = calendarRef.current.getApi();
    // const id = arg.event._def.publicId;
    setEventManagerVisible(true);
    setEventManagerX(arg.jsEvent.screenX);
    setEventManagerY(arg.jsEvent.screenY);
    console.log(arg.event._instance.range);

    if (!arg.event._def.publicId && !arg.event.id && !arg.event.title && !arg.event._instance.range.start && !arg.event._instance.range.end) {
      throw new Error("Invalid event!");
    }

    console.log(arg.event.end);

    const event = {
      id: arg.event._def.publicId,
      title: arg.event.title,
      start: (arg.event._instance.range.start as Date).toISOString(),
      end: (arg.event._instance.range.end as Date).toISOString()
    };

    console.log(event);

    setCurrentEventInfo(event);
  }

  return (
      <div className={"Calendar w-100"}>
        <EventManageBox key={uuidv4()} visible={eventManagerVisible} x={eventManagerX} y={eventManagerY} event={currentEventInfo} />
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
