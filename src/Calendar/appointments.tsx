import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, CalendarEvent } from './calendarSlice';
import '../App.css';

function appointments() {
    const eventDispatch = useDispatch();

    function askEvent(): CalendarEvent {
        return {
            title: 'test add event',
            start: '2022-07-27',
            end: '2022-07-29'
        }
    }

    return(
        <div className='Appointments'>
            <h1>Appointments</h1>
            <hr />
            <button onClick={() => eventDispatch(addEvent(askEvent()))}>Add Event</button>
        </div>
    );
}

export default appointments;