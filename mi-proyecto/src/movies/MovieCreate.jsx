import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../userContext";
import { addMovie } from '../slices/movies/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const MovieCreate = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { isSaving = true, error = "" } = useSelector((state) => state.movies);
  let { authToken, setAuthToken } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const afegir = (data) => {
    const data2 = { ...data, cover: data.cover[0] }
    dispatch(addMovie(data2, authToken, navigate));
  }
  const afegir1 = (data) => {
    const data2 = { ...data, intro: data.intro[0] }
    dispatch(addMovie(data2, authToken, navigate));
  }
  return (
    <div>
      <div className="card ">
        <div className="card-header ">
          <h1 className="text-center h2 fw-bold">Crear Movie</h1>
        </div >
        <form method="post" className="separar" enctype="multipart/form-data">
          <div className="form-group">
            <label for="name">Title</label>
            <input {...register("title", {
              required: "Aquest camp és obligatori",
              maxLength: {
                value: 255,
                message: "El nom pot contenir un maxim de 255 caràcters"
              },

            })} type="text"
              className="form-control" />
          </div>
          {errors.title && <p>{errors.title.message}</p>}

          <div className="form-group">
            <label for="description">Description</label>
            <textarea {...register("description", {
              required: "Aquest camp és obligatori",
              maxLength: {
                value: 255,
                message: "La descripció pot contenir un maxim de 255 caràcters"
              },

            })}
              className="form-control"></textarea>
          </div>
          {errors.description && <p>{errors.description.message}</p>}

          <div className="form-group">
            <label for="gender">Gender</label>
            <textarea {...register("gender", {
              required: "Aquest camp és obligatori",
              maxLength: {
                value: 255,
                message: "La descripció pot contenir un maxim de 255 caràcters"
              },

            })}
              className="form-control"></textarea>
          </div>
          {errors.gender && <p>{errors.gender.message}</p>}

          <div className="form-group">
            <label for="upload">Cover</label>
            <input type="cover" accept=".gif,.jpg,.jpeg,.png,.mp4" {...register("cover", {
              required: "Aquest camp és obligatori"
            })}
              className="form-control" />
          </div>
          {errors.cover && <p>{errors.cover.message}</p>}

          <div className="form-group">
            <label for="intro">Intro</label>
            <input type="intro" accept=".gif,.jpg,.jpeg,.png,.mp4" {...register("intro", {
              required: "Aquest camp és obligatori"
            })}
              className="form-control" />
          </div>
          {errors.intro && <p>{errors.intro.message}</p>}

          {isSaving ?
            <>

            </> :
            <>
              <button className="btn btn-primary"
                onClick={handleSubmit(afegir)}
              >Afegir cover</button>
            </>
          }

          {isSaving ?
            <>

            </> :
            <>
              <button className="btn btn-primary"
                onClick={handleSubmit(afegir1)}
              >Afegir intro</button>
            </>
          }
          <button className="btn btn-secondary"
            onClick={() => reset()}
          >Reset</button>
          {error ? (<div>{error}</div>) : (<></>)}        </form>
      </div>
    </div>
  )
}

export default MovieCreate