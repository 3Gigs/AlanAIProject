import { configureStore } from '@reduxjs/toolkit'
import calendarSlice from "./Calendar/calendarSlice"

export const store = configureStore({
    reducer: {
        calendarTest: calendarSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;