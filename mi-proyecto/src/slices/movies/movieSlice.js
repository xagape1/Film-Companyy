import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    formulari: [],

    isSaving: false,

    error: "",

    isLoading: false,

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

    filter: { title: "", gender: "" },

}
export const movieSlice = createSlice({

    name: "movie",

    initialState,

    reducers: {

        setisSaving: (state, action) => {
            state.isSaving = action.payload;
        },

        setisLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload
        },

        setMovie: (state, action) => {
            state.movie = action.payload
        },

        setMovies: (state, action) => {
            state.movies = action.payload
        },

        setPage: (state, action) => {
            state.page = action.payload
        },

        setPages: (state, action) => {
            state.pages = action.payload
        },

        setFilter: (state, action) => {
            state.filter = action.payload
        }

    }

});

export const { setisSaving, setisLoading, setMovie, setError, setMovies, setPages, setPage, setFilter } = movieSlice.actions;

export default movieSlice;
