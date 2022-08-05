import { getAuth } from "@firebase/auth";
import { onValue, ref, set } from "@firebase/database";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db, firebaseApp } from "../main";
import { ICalendarEvent, isCalendarEvent } from "./calendar";

export enum LoadStatus {
    // eslint-disable-next-line no-unused-vars
    IDLE,
    // eslint-disable-next-line no-unused-vars
    LOADING,
}

interface CalendarState {
    value: Array<ICalendarEvent>,
    status: LoadStatus
}

export const getEvents = () => new Promise<Array<ICalendarEvent>>((resolve, reject) => {
  let events: Array<ICalendarEvent> = [];

  const auth = getAuth(firebaseApp);
  const email = auth.currentUser?.email;
  if (!email) {
    throw new Error("Email not found!");
  }
  const query = ref(db, `users/${email.replace(".", "DOT")}`);

  const unsub = onValue(query, (snapshot) => {
    unsub();
    if (snapshot?.val()?.events) {
      const eventsObj = Object.values(snapshot.val().events);
      for (const event of Object.values(eventsObj)) {
        if (isCalendarEvent(event)) {
          events = [...events, event as ICalendarEvent];
        }
      }
    }
    resolve(events);
  }, reject);
});

export const getEventsThunk = createAsyncThunk("calendarSlice/refreshEvents", async () => {
  return await getEvents();
});

const initialState: CalendarState = {
  value: [],
  status: LoadStatus.IDLE
};

const calendarSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<ICalendarEvent>) => {
      const auth = getAuth(firebaseApp);
      const email = auth.currentUser?.email;
      if (!email) {
        throw new Error("Email not found!");
      }
      set(ref(db, `users/${email.replace(".", "DOT")}/events/${action.payload.id}`), {
        title: action.payload.title,
        id: action.payload.id,
        start: action.payload.start,
        end: action.payload.end
      });
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      const auth = getAuth(firebaseApp);
      const email = auth.currentUser?.email;
      if (!email) {
        throw new Error("Email not found!");
      }
      set(ref(db, `users/${email.replace(".", "DOT")}/events/${action.payload}`), null);
      state.value = state.value.filter(e => e.id !== action.payload);
    },
    resetEvents: (state) => {
      return initialState;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getEventsThunk.pending, (state, action) => {
        state.status = LoadStatus.LOADING;
      })
      .addCase(getEventsThunk.fulfilled, (state, action) => {
        const newValue: Array<ICalendarEvent> = [];

        action.payload.forEach(e => {
          newValue.push(e);
        });
        state.value = newValue;

        state.status = LoadStatus.IDLE;
      });
  }
});

export default calendarSlice.reducer;

export const { addEvent, deleteEvent, resetEvents } = calendarSlice.actions;
