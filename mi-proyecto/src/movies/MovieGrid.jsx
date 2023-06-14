import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { delMovie } from '../slices/movies/thunks';
import { useDispatch, useSelector } from 'react-redux';

export const MovieGrid = ({ movie }) => {

  const { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const { movies = [], page = 0, isLoading = true, error = "" } = useSelector((state) => state.movies);
  const dispatch = useDispatch();



  return (
    <div key={movie.id} className="p-1 rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
      <div className="sm:w-7/12 pl-0 p-5">
        <div className="space-y-2">
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold text-cyan-900">{movie.title}</h4>
            <p className="text-gray-600">{movie.description}</p>
            <p className="text-gray-600">{movie.gender}</p>
          </div>
          <Link to={"/movies/" + movie.id} className="w-max text-cyan-600"> Llegeix més </Link>
          (   <>
            <Link to={"/movies/edit/" + movie.id} className="w-max text-cyan-600"> Editar </Link>
            <a href="#" className=" w-max text-cyan-600" onClick={(e) => dispatch(delMovie(movie, authToken))}> Esborrar</a>
          </>
          )
        </div>

      </div>
      <span className="text-sm text-gray-900 font-light px-0 py-1 whitespace-nowrap">

      </span>
    </div>
  )
}
export default MovieGrid;
