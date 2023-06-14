import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    movie: {
        title: "",
        description: "",
        gender: "",
        cover: { filepath: "" },
        intro: { filepath: "" },
    },

    page: 1,
    pages: [],
    isLoading: false,
    error: "",
    filter: { title: "", gender: "" },
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        
        setisLoading: (state, action) => {
            state.isLoading = true;
        },
        
        setMovies: (state, action) => {
            state.movies = action.payload
            state.isLoading = false        },
        
        setMovie: (state, action) => {
            state.movie = action.payload
            state.isLoading = false        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        setPage: (state, action) => {
            state.page = action.payload;
        },

        setPages: (state, action) => {
            state.pages = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { setisLoading, setMovies, setMovie, setError,  setPages, setPage, setFilter } = movieSlice.actions;
export default movieSlice.reducer
