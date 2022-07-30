import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, CalendarEvent } from './calendarSlice';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';

function AddAppointmentBox() {
    const [startDate, setStartDate] = useState(new Date());
    const eventDispatch = useDispatch();

    function askEvent(): CalendarEvent {
        return {
            title: 'test add event',
            start: '2022-07-27',
            end: '2022-07-29'
        }
    }

    return (
        <Card className="AddAppointmentbox">
            <Form>
                <Form.Group className="mb-3" controlId='formBasicEmail'>
                    <Form.Label>Event</Form.Label>
                    <Form.Control type="text" placeholder="Doctor's appointment" />
                    <Form.Label>Date Start</Form.Label>
                    <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                </Form.Group>
            </Form>
            <Button variant={"success"} onClick={() => eventDispatch(addEvent(askEvent()))}>Add Event</Button>
        </Card>
    );
}

function appointments() {
    return(
        <Card className='Appointments'>
            <h1>Appointments</h1>
            <AddAppointmentBox />
            <hr />
        </Card>
    );
}

export default appointments;