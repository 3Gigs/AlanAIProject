import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../reduxStore';

// export const calendarSlice = createSlice({
//     name: 'calendarSlice',
//     initialState: {
//         value: 0,
//     },
//     reducers: {
//         increment: (state) => {
//             state.value += 1;
//         },
//         decrement: (state) => {
//             state.value -= 1;
//         },
//         incrementByAmount: (state, action) => {
//             state.value += action.payload
//         },
//     }
// });

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
//export const { increment, decrement, incrementByAmount } = calendarSlice.actions;
export const { addEvent } = calendarSlice.actions;