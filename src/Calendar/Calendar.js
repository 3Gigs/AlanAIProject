import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import React from 'react'

function Calendar()
{
  function handleClick(arg) {
    alert(arg.dateStr)
    console.log("Clicked!")
  }

  return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        headerToolbar={{start: "title dayGridMonth,dayGridWeek,today", end: "prev next"}}
        initialView="dayGridMonth"
        aspectRatio={2.1}
        dateClick={function(arg) {
          alert("Clicked!")
        }}
      />
  );
}

export default Calendar;