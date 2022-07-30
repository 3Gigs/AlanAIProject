import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { RootState } from '../reduxStore';
import { addEvent } from './calendarSlice';
import '../App.css';

function Calendar()
{
  const events = useSelector((state: RootState) => state.calendarTest.value)
  const dispatch = useDispatch();

  function handleClick(arg: any) {
    //dispatch(addEvent());
  }

  function handleEventClick() {
    alert("Event clicked!");
  }

  return (
    <div className={'Calendar w-100'}>
      <FullCalendar
        headerToolbar={{start: "dayGridMonth,dayGridWeek,today", center: "title", end: "prev next"}}
        plugins={[ dayGridPlugin, interactionPlugin ]}
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