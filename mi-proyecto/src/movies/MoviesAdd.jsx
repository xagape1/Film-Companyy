import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../userContext';

import "../App.css"

import { useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../slices/movies/thunks";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export const MoviesAdd = () => {


  const { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const { movies = [], page = 0, error = "", isLoading = true } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const afegir = (data) => {

    const data2 = { ...data, cover: data.cover[0], intro: data.intro[0]}

    dispatch(addMovie(data2, authToken));

    navigate("/movies/grid");

  }


  return (
    <>
      <div className="py-9 pl-9">

        <div className="py-9 flex flex-col gap-y-2">
          <label className="text-gray-600" htmlFor="Name">Title</label>
          <input
            type="text"
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            {...register("title", {
              required: "Aquest camp és obligatori",
              maxLength: {
                value: 255,
                message: "El nom pot contenir un maxim de 255 caràcters"
              },
            })}
          />
        </div>
        {errors.name && <p>{errors.name.message}</p>}

        <div className="w-1/3">
          <label className="text-gray-600">Descripció</label>
          <textarea
            className="
      w-full
      h-32
      px-4
      py-3
      border-2 border-gray-300
      rounded-sm
      outline-none
      focus:border-blue-400
    "
            placeholder="Explica'ns alguna cosa d'aquest lloc..."
            {...register("description", {
              required: "Aquest camp és obligatori",
              maxLength: {
                value: 255,
                message: "La descripció pot contenir un maxim de 255 caràcters"
              },

            })}
          ></textarea>
          {errors.description && <p>{errors.description.message}</p>}

          <div className="py-9 flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="Name">Gender</label>
            <input
              type="text"
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
              {...register("gender", {
                required: "Aquest camp és obligatori",
                maxLength: {
                  value: 255,
                  message: "El nom pot contenir un maxim de 255 caràcters"
                },
              })}
            />
          </div>
          {errors.gender && <p>{errors.gender.message}</p>}

          <div className="flex justify-center">
            <div className="mb-3 w-96">
              <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600">Imatge PNG, JPG or GIF</label>
              <input name="cover"
                // onChange={ handleChange}
                className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file"
                {...register("cover", {
                  required: "Aquest camp és obligatori",
                })}
              />
            </div>
            {errors.cover && <p>{errors.cover.message}</p>}
          </div>

          <div className="flex justify-center">
            <div className="mb-3 w-96">
              <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600">Video MP4 </label>
              <input name="intro"
                // onChange={ handleChange}
                className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file"
                {...register("intro", {
                  required: "Aquest camp és obligatori",
                })}
              />
            </div>
            {errors.intro && <p>{errors.intro.message}</p>}
          </div>

          <div className="py-9">
            <button
              onClick={handleSubmit(afegir)}
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Afegir Entrada
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default MoviesAdd;
