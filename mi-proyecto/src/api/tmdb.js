import axios from "axios";
const API_KEY = "66d0445880766ce11eae51e58a874209";
const LANGUAGE = "es-ES";

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Accept: "application/json"
  },
  params: {
    api_key: API_KEY,
    language: LANGUAGE
  }
});
