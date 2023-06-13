import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../userContext";
import MovieGrid from './MovieGrid'
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../slices/movies/thunks';
import Paginate from './Paginate';

const MoviesGrid = () => {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  const dispatch = useDispatch();
  const { isSaving = true, isLoading,movies,page ,filter} = useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(getMovies(authToken,page))
  }, [page,filter]);
  console.log(movies)
  
  return (
    <div>
      <h1>Movies Grid</h1>
      {isLoading ?
        "cargando.." :
        (movies).map((movie) => (
          <tr key={movie.id}>
              <MovieGrid movie={movie} />
          </tr>
        ))}
       <Paginate />
    </div>
  )
}

export default MoviesGrid
