import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './slices/movies/movieSlice'

export const store = configureStore({
    reducer: {
        movies:movieSlice,
    }
})
