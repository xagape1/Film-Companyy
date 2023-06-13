import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../slices/movies/movieSlice';

const MovieGrid = ({ movie }) => {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="element">
        <div className="imagen">
          <img src={"http://localhost:8000/storage/" + movie.cover.filepath} width="200px" height="400px" alt={movie.title} />
        </div>
        <video className="video-fluid" controls>
          <source src={"http://localhost:8000/storage/" + movie.intro.filepath} type="video/mp4" />
          Tu navegador no admite la reproducción de videos.
        </video>
        <div className="texto">
          <div className="titulo">{movie.title}</div>
          <div className="description">{movie.description}</div>
          <div className="description">{movie.gender}</div>

          <div className="veureeditaresborrar"><button onClick={(e) => { navigate("/movies/" + movie.id) }}>veure</button>

            <button onClick={(e) => { dispatch(setFilter({ title: "" })) }}>filtrar por title</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieGrid
