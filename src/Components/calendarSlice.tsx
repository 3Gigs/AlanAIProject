import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../reduxStore';

export interface CalendarEvent {
    title: string,
    start: string,
    end: string,
}

interface CalendarState {
    value: Array<CalendarEvent>,
}

const initialState: CalendarState = {
    value: []
}

export const calendarSlice = createSlice({
    name: 'calendarSlice',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<CalendarEvent>) => {
           state.value.push(action.payload);
        },
    },
});

export default calendarSlice.reducer;
export const { addEvent } = calendarSlice.actions;