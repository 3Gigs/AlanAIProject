import { configureStore } from '@reduxjs/toolkit'
import calendarSlice from "./Calendar/calendarSlice"

export default configureStore({
    reducer: {
        calendarTest: calendarSlice
    },
})