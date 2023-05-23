import { useEffect } from 'react';
import axios from 'axios'
import "./Series.css";
import SeriesCard from './SeriesCard';
import { useState } from 'react';
import YouTube from 'react-youtube';
import Header from '../Layout/Header';
import { Navigate } from 'react-router-dom';

const Series = () => {

    const API_URL = "https://api.themoviedb.org/3";
    const API_KEY = "66d0445880766ce11eae51e58a874209";
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

    // endpoint para las imagenes
    const URL_IMAGE = "https://image.tmdb.org/t/p/original";

    // variables de estado
    const [series, setSeries] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [trailer, setTrailer] = useState(null);
    const [movie, setMovie] = useState({ title: "Loading Movies" });
    const [playing, setPlaying] = useState(false);


    const fetchSeries = async (searchKey) => {
        const type = searchKey ? "search" : "discover";
        const {
            data: { results },
        } = await axios.get(`${API_URL}/${type}/tv/popular?`, {
            params: {
                api_key: API_KEY,
                query: searchKey,
            },
        });

        console.log('data', results);

        setSeries(results);
        setMovie(results[0]);

        if (results.length) {
            await fetchMovie(results[0].id);
        }
    };

    const fetchSerie = async (id) => {
        const { data } = await axios.get(`${API_URL}/movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos",
            },
        });

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(
                (vid) => vid.name === "Official Trailer"
            );
            setTrailer(trailer ? trailer : data.videos.results[0]);
        }
        //return data
        setMovie(data);
    };


    return (
        <div>


        </div>
    )
}

export default Series
