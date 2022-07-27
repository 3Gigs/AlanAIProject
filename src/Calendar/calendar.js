import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { increment, decrement, calendarSlice } from './calendarSlice'

function Calendar()
{
  const count = useSelector((state) => state.calendarTest.value)
  const dispatch = useDispatch();

  function handleClick(arg) {
    dispatch(increment());
    alert("Clicked! Value: " + count);
  }

  return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        headerToolbar={{start: "dayGridMonth,dayGridWeek,today", center: "title", end: "prev next"}}
        initialView="dayGridMonth"
        aspectRatio={2.1}
        dateClick={handleClick}
      />
  );
}

export default Calendar;