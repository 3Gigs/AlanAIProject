import { useState } from "react";
import { set, ref } from "@firebase/database";
import { db, firebaseApp } from "../main";
import { getAuth } from "@firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../reduxStore";
import { ICalendarEvent } from "./Calendar";
import { addEvent } from "./calendarSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";

function AddAppointmentBox () {
  const [eventInfo, setEventInfo] = useState("");
  const [startDate, setStartDate] = useState(DateTime.now());
  const [endDate, setEndDate] = useState(DateTime.now());
  const eventDispatch = useAppDispatch();
  const email = getAuth(firebaseApp)?.currentUser?.email;
  if (!email) {
    throw new Error("Email not found!");
  }

  return (
      <div>
        <form className="AddApptBox">
          <TextField id="outlined-basic" label="Event" variant="outlined" onChange={(txt: any) => setEventInfo(txt.target.value)}></TextField>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              if (newValue) {
                setStartDate(newValue);
              }
            }}>
          </DateTimePicker>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              if (newValue) {
                setEndDate(newValue);
              }
            }}>
          </DateTimePicker>
          <Button variant="contained" onClick={() => {
            if (eventInfo.length <= 0 || !startDate || !endDate) {
              alert("Please fully fill out appointment detail!");
            } else {
              console.log(startDate);
              const id = uuidv4();
              set(ref(db, `users/${email.replace(".", "DOT")}/events/${id}`), {
                title: eventInfo,
                id,
                start: startDate.toISO(),
                end: endDate.toISO()
              });
              const payload: ICalendarEvent = {
                title: eventInfo,
                id,
                start: startDate.toISO(),
                end: endDate.toISO()
              };
              eventDispatch(addEvent(payload));
            }
          }
          }>Add Event
        </Button>
        </form>
      </div>
  );
}

function appointments () {
  return (
    <div className="ApptSidebar">
      <h1>Appointments</h1>
      <AddAppointmentBox />
      <hr />
    </div>
  );
}

export default appointments;
