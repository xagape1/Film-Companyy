import React, { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import { useDispatch, useSelector } from "react-redux";
import { getMovie, delMovie } from '../slices/movies/thunks';

const Movie = () => {
    const { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
    const { movie, page=0, error="", isLoading=true } = useSelector((state) => state.movies);

    const { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovie(id, authToken ));
    }, []);

    return (
        <>
    
          {isLoading ? (
            "Espera...."
          ) : (
            <>
              <div className="md:grid md:grid-col-1 md:grid-flow-row gap-4 md:mx-auto p-6 justify-center dark:bg-gray-900 dark:text-gray-100">
                <div className="relative overflow-hidden bg-no-repeat bg-cover col-span-1 ">
                  <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-40 transition duration-300 ease-in-out bg-white"></div>
                </div>
    
                <div className="max-w-xl">
                  <h2 className="bg-blue-300 col-span-1 text-xl font-semibold">
                    {movie.title}
                  </h2>
                  <span className="self-center px-7 bg-gray-200 text-x2 font-semibold">
                    Description: {movie.description}
                  </span>
                  <span className="self-center px-7 bg-gray-200 text-x2 font-semibold">
                    Gender: {movie.gender}
                  </span>
                  
                  <div className="mt-10 h-12 max-h-full md:max-h-screen">
                   
                      <>
                        <Link
                          to={"/movies/edit/" + id}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-10 px-4 h-10 md:h-10 uppercase"
                        >
                          {" "}
                          Editar{" "}
                        </Link>
                        <a
                          href="#"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                          onClick={(e) => dispatch( delMovie(movie, authToken)) }
                        >
                          Esborrar
                        </a>
                      </>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      );


}

export default Movie
