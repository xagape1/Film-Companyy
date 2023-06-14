import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../slices/movies/thunks";

import { MovieGrid } from "./MovieGrid";


export const MoviesGrid = () => {
  const { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const { movies = [], page, isLoading = true, error = "", filter } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies(authToken, page));
  }, [page, filter]);
  return (
    <>
      <div className="py-16 bg-gradient-to-br from-green-50 to-cyan-100">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="mb-12 space-y-2 text-center">
            <span className="block w-max mx-auto px-3 py-1.5 border border-green-200 rounded-full bg-green-100 text-green-600 text-4x1">
              Llistat de Pel·licules
            </span>
          </div>
          <div className="block w-max mx-auto px-3 py-1.5">
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            {isLoading ? "Espera..." : <>{movies.map((movie) => {
              return (

                <>
                  (<MovieGrid key={movie.id} movie={movie} />)

                </>
              )
            })}</>}

          </div>
          <div className="block w-max mx-auto px-3 py-1.5">
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesGrid;
