import { getAuth } from '@firebase/auth';
import { onValue, ref, set } from '@firebase/database';
import { uuidv4 } from '@firebase/util';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { db, firebaseApp } from '../main';
import { ICalendarEvent, isCalendarEvent } from './calendar';

export interface PayloadXtraInfo {
    email: string;
};

export enum LoadStatus {
    IDLE,
    LOADING,
}

interface CalendarState {
    value: Array<ICalendarEvent>,
    status: LoadStatus
}

const getEvents = () => new Promise<Array<ICalendarEvent>>((resolve, reject) => {
    let events = new Array<ICalendarEvent>;

    const auth = getAuth(firebaseApp);
    const email = auth.currentUser?.email;
    if (!email) {
        throw new Error("Email not found!");
    }
    const query = ref(db, `users/${email.replace(".", "DOT")}`);

    const unsub = onValue(query, (snapshot) => {
        unsub();
        const eventsObj = Object.values(snapshot.val().events);
        for (let event of Object.values(eventsObj)) {
            if (isCalendarEvent(event)) {
                events = [...events, event as ICalendarEvent];
            }
        }
        resolve(events);
    }, reject);
});

export const getEventsThunk = createAsyncThunk('calendarSlice/refreshEvents', async () => {
    return await getEvents();
});

const initialState: CalendarState =  {
    value: [],
    status: LoadStatus.IDLE
}

const calendarSlice = createSlice({
    name: 'calendarSlice',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<ICalendarEvent & PayloadXtraInfo>) => {
            state.value.push(action.payload);
            const id = uuidv4();
            set(ref(db, `users/${action.payload.email.replace(".", "DOT")}/events/${id}`), {
                title: action.payload.title,
                id,
                start: action.payload.start,
                end: action.payload.end
            });
        },
        deleteEvent: (state, action: PayloadAction<ICalendarEvent>) => {
            console.log(action.payload);
            // To be implemented...
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
                })
                state.value = newValue;

                state.status = LoadStatus.IDLE;
            })
    }
});

export default calendarSlice.reducer;

export const { addEvent, deleteEvent, resetEvents } = calendarSlice.actions;

