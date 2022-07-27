import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { RootState } from '../reduxStore';
import { addEvent } from './calendarSlice';

function Calendar()
{
  const count = useSelector((state: RootState) => state.calendarTest.value)
  const dispatch = useDispatch();

  function handleClick(arg: any) {
    //dispatch(addEvent());
    alert("Clicked! Value: " + count);
  }

  return (
      <FullCalendar
        headerToolbar={{start: "dayGridMonth,dayGridWeek,today", center: "title", end: "prev next"}}
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        aspectRatio={2.1}
        dateClick={handleClick}
      />
  );
}

export default Calendar;