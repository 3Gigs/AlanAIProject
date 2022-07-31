import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, CalendarEvent } from './calendarSlice';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';

function AddAppointmentBox() {
    const [eventInfo, setEventInfo] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const eventDispatch = useDispatch();

    // TODO: Remove this
    // function askEvent(): CalendarEvent {
    //     return {
    //         title: 'test add event',
    //         start: '2022-07-27',
    //         end: '2022-07-29'
    //     }
    // }

    return (
        <Card className="AddAppointmentbox">
            <Form>
                <Form.Group className="mb-3" controlId='formBasicEmail'>
                    <Form.Label>Event</Form.Label>
                    <Form.Control type="text" onChange={(txt) => setEventInfo(txt.target.value)} placeholder="Ex. Doctor's appointment" />
                    <Form.Label>Date Start</Form.Label>
                    <DatePicker selected={startDate} showTimeSelect onChange={(date: Date) => setStartDate(date)} />
                    <Form.Label>Date End</Form.Label>
                    <DatePicker selected={endDate} showTimeSelect onChange={(date: Date) => setEndDate(date)} />
                </Form.Group>
            </Form>
            <Button variant={"success"} onClick={() => eventDispatch(
                addEvent(
                    {
                        title: eventInfo,
                        start: startDate.toISOString(),
                        end: endDate.toISOString()
                    }
                )
            )}>Add Event</Button>
        </Card>
    );
}

function appointments() {
    return (
        <Card className='Appointments'>
            <h1>Appointments</h1>
            <AddAppointmentBox />
            <hr />
        </Card>
    );
}

export default appointments;