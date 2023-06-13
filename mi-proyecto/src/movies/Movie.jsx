import React from 'react'
import { UserContext } from "../userContext";
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getMovie, delMovie } from '../slices/movies/thunks';

const Movie = () => {
    let { authToken, setAuthToken, refresh, setRefresh, setUsuari } = useContext(UserContext);
    const { id } = useParams();
    let navigate = useNavigate();
    const { isSaving = true, error, isLoading, movie } = useSelector((state) => state.movies);
    const dispatch = useDispatch();

    const { pathname } = useLocation()
    const { pathname1 } = useLocation()

    useEffect(() => {
        dispatch(delMovie(authToken, navigate, id));
        dispatch(getMovie(authToken, id));
    }, []);



    const data = {
        "id": movie.id,
        "title": movie.title,
        "description": movie.description,
        "gender": movie.gender,
        "ruta": pathname,
        "ruta1": pathname1
    }

    return (
        <>
            {isLoading ?
                "cargando..."
                :
                <>
                    <div class="card">
                        <div class="card-header">s
                            <img class="img-fluid" src={"http://localhost:8000/storage/" + movie.cover.filepath} title="Image preview" width="300px" />
                            <video className="video-fluid" controls>
                                <source src={"http://localhost:8000/storage/" + movie.intro.filepath} type="video/mp4" />
                                Tu navegador no admite la reproducción de videos.
                            </video>
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td>ID</td>
                                        <td>{movie.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Title</td>
                                        <td>{movie.title}</td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>{movie.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>{movie.gender}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={(e) => { navigate("/movies/edit/" + movie.id) }}>📝</button>
                            <button onClick={(e) => { dispatch(delMovie(authToken, navigate, movie.id)) }}>🗑️</button>
                        </div>
                    </div>
                </>
            }
        </>
    )


}

export default Movie
