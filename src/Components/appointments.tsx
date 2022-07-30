import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, CalendarEvent } from './calendarSlice';
import Button from "react-bootstrap/Button";
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
            <Button variant={"primary"} onClick={() => eventDispatch(addEvent(askEvent()))}>Add Event</Button>
        </div>
    );
}

export default appointments;