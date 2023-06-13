import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../userContext";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setisLoading, setMovie } from '../slices/movies/movieSlice';
import { getMovie, handleUpdate } from '../slices/movies/thunks';

const MovieEdit = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let [formulari, setFormulari] = useState({});
  let { authToken, setAuthToken } = useContext(UserContext);
  const { id } = useParams();
  const { isSaving = true, error="", isLoading, movie } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getMovie(authToken, id));
  }, []);

  useEffect(() => {
    setFormulari({
      title: movie.title,
      description: movie.description,
      gender: movie.gender,
    });
  }, [movie]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.type && e.target.type === "file") {
      setFormulari({
        ...formulari,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormulari({
        ...formulari,
        [e.target.name]: e.target.value
      });
    }
  };

  return (
    <>
      {isLoading ?
        "cargando..."
        :
        <div>
          <div className="card">
            <div className="card-header">
              <h1 className="text-center h2 fw-bold">Edit Movie</h1>
            </div>
            <form method="post" className="separar" encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" value={formulari.title} onChange={handleChange} name="title" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea name="description" value={formulari.description} onChange={handleChange} className="form-control"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <textarea name="gender" value={formulari.gender} onChange={handleChange} className="form-control"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="cover">Cover</label>
                <input type="file" onChange={handleChange} name="cover" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="intro">Intro</label>
                <input type="file" onChange={handleChange} name="intro" className="form-control" />
              </div>
              <button className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                dispatch(handleUpdate(authToken, id, formulari, navigate));
              }}>Update</button>
              {error ? (<div>{error}</div>) : (<></>)}
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default MovieEdit;