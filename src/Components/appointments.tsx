import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { set, ref } from "@firebase/database";
import { db, firebaseApp } from "../main";
import "react-datepicker/dist/react-datepicker.css";
import { getAuth } from "@firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../reduxStore";
import { ICalendarEvent } from "./calendar";
import { addEvent } from "./calendarSlice";

function AddAppointmentBox () {
  const [eventInfo, setEventInfo] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const eventDispatch = useAppDispatch();
  const email = getAuth(firebaseApp)?.currentUser?.email;
  if (!email) {
    throw new Error("Email not found!");
  }

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
            <Button variant={"success"} onClick={() => {
              if (eventInfo.length <= 0 || !startDate || !endDate) {
                alert("Please fully fill out appointment detail!");
              } else {
                const id = uuidv4();
                set(ref(db, `users/${email.replace(".", "DOT")}/events/${id}`), {
                  title: eventInfo,
                  id,
                  start: startDate.toISOString(),
                  end: endDate.toISOString()
                });
                const payload: ICalendarEvent = {
                  title: eventInfo,
                  id,
                  start: startDate.toISOString(),
                  end: endDate.toISOString()
                };
                eventDispatch(addEvent(payload));
              }
            }
            }>Add Event</Button>
        </Card>
  );
}

function appointments () {
  return (
        <Card className='Appointments'>
            <h1>Appointments</h1>
            <AddAppointmentBox />
            <hr />
        </Card>
  );
}

export default appointments;
