import { useSelector, useDispatch } from 'react-redux';
import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { RootState } from '../reduxStore';
import { addEvent } from './calendarSlice';
import '../App.css';
import { useEffect, useState } from 'react';
import { db, firebaseApp } from '../main';
import { getAuth } from '@firebase/auth';
import { onValue, ref } from '@firebase/database';

export interface ICalendarEvent {
  end: string;
  start: Date;
  title: Date;
}

function isCalendarEvent(obj: unknown): obj is ICalendarEvent {
  const event = obj as ICalendarEvent;
  return (
    event.end !== undefined && 
    event.start !== undefined && 
    event.title !== undefined
  );
}

function Calendar() {
  const [events, setEvents] = useState(new Array<ICalendarEvent>);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const email = auth.currentUser?.email;
    if (!email) {
      throw new Error("Email not found!");
    }
    const query = ref(db, `users/${email.replace(".", "DOT")}`);

    onValue(query, (snapshot) => {
      const events = Object.values(snapshot.val().events);
      setEvents([]);
      for (let event of Object.values(events)) {
        if(isCalendarEvent(event)) {
          setEvents((e) => [...e, event as ICalendarEvent]);
        }
      }
    });
  }, []);

  function handleClick(arg: any) {
    //dispatch(addEvent());
  }

  function handleEventClick() {
    alert("Event clicked!");
  }

  return (
    <div className={'Calendar w-100'}>
      <FullCalendar
        headerToolbar={{ start: "dayGridMonth,dayGridWeek,today", center: "title", end: "prev next" }}
        plugins={[dayGridPlugin, interactionPlugin]}
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