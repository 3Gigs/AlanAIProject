import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import "../App.css";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../reduxStore";
import { addEvent, getEventsThunk } from "./calendarSlice";
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
    typeof event.end === "string" &&
    typeof event.id === "string" &&
    typeof event.start === "string" &&
    typeof event.title === "string"
  );
}

function Calendar () {
  const events = useAppSelector((state) => state.calendarTest.value);
  const eventsDispatch = useAppDispatch();
  const calendarRef = useRef<FullCalendar>();

  const [eventManagerVisible, setEventManagerVisible] = useState(false);
  const [eventManagerX, setEventManagerX] = useState(0);
  const [eventManagerY, setEventManagerY] = useState(0);
  const [currentEventInfo, setCurrentEventInfo] = useState({ id: "", title: "", start: "", end: "" });

  useEffect(() => {
    eventsDispatch(getEventsThunk());
    document.addEventListener("calendarCreateEvent", e => {
      const event = e as CustomEvent<unknown>;

      function isPartialCalendarEvent (val: unknown): val is ICalendarEvent {
        const eventInfo = val as ICalendarEvent;

        return (
          typeof eventInfo.start === "string" &&
          typeof eventInfo.end === "string" &&
          typeof eventInfo.title === "string"
        );
      }

      if (isPartialCalendarEvent(event.detail)) {
        event.detail.id = uuidv4();
        eventsDispatch(addEvent(event.detail));
        return;
      }

      console.error("Invalid calendarCreateEvent event data!");
    });
  }, []);

  function handleClick (arg: any) {
    // dispatch(addEvent());
    // dispatch(deleteEvent());
  }

  function handleEventClick (arg: any) {
    setEventManagerVisible(true);
    setEventManagerX(arg.jsEvent.screenX);
    setEventManagerY(arg.jsEvent.screenY);

    if (!arg.event._def.publicId && !arg.event.id && !arg.event.title && !arg.event._instance.range.start && !arg.event._instance.range.end) {
      throw new Error("Invalid event!");
    }

    const event = {
      id: arg.event._def.publicId,
      title: arg.event.title,
      start: (arg.event._instance.range.start as Date).toISOString(),
      end: (arg.event._instance.range.end as Date).toISOString()
    };

    setCurrentEventInfo(event);
  }

  return (
      <div className={"Calendar w-100"}>
        <EventManageBox key={uuidv4()} visible={eventManagerVisible} x={eventManagerX} y={eventManagerY} event={currentEventInfo} onCloseClick={() => { setEventManagerVisible(false); }} />
        <FullCalendar
          headerToolbar={{ start: "dayGridMonth,dayGridWeek,today", center: "title", end: "prev next" }}
          plugins={[dayGridPlugin, interactionPlugin]}
          ref={calendarRef as React.MutableRefObject<FullCalendar>}
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
