import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie, editMovie } from '../slices/movies/thunks';

export const MovieEdit = () => {
  const { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const { movie, page = 0, error = '', isLoading = true } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  const [formulari, setFormulari] = useState({
    title: '',
    description: '',
    gender: '',
    coverImage: null,
    coverVideo: null,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormulari((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    } else {
      setFormulari((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleEditMovie = () => {
    dispatch(editMovie(formulari, authToken, movie.id));
  };

  useEffect(() => {
    dispatch(getMovie(id, authToken));
  }, []);

  useEffect(() => {
    if (movie) {
      setFormulari((prevState) => ({
        ...prevState,
        title: movie.title,
        description: movie.description,
        gender: movie.gender,
      }));
    }
  }, [movie]);

  return (
    <>
      <div className="py-9 pl-9">
        <div className="py-9 flex flex-col gap-y-2">
          <label className="text-gray-600" htmlFor="Name">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formulari.title}
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            onChange={handleChange}
          />
        </div>

        <div className="w-1/3">
          <label className="text-gray-600">Descripció</label>
          <textarea
            name="description"
            value={formulari.description}
            className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-sm outline-none focus:border-blue-400"
            placeholder="Explica'ns alguna cosa d'aquest lloc..."
            onChange={handleChange}
          ></textarea>

          <div className="flex justify-center">
            <div className="mb-3 w-96">
              <label htmlFor="coverImage" className="form-label inline-block mb-2 text-gray-600">
                Imatge PNG, JPG or GIF (MAX. 800x400px)
              </label>
              <input
                name="coverImage"
                onChange={handleChange}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="coverImage"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="mb-3 w-96">
              <label htmlFor="coverVideo" className="form-label inline-block mb-2 text-gray-600">
                Video MP4
              </label>
              <input
                name="coverVideo"
                onChange={handleChange}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="coverVideo"
              />
            </div>
          </div>

          <div className="py-9">
            {error ? (
              <div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 mb-4 px-4 ring-2 ring-red-200">
                {error}
              </div>
            ) : (
              <></>
            )}
            <button
              onClick={handleEditMovie}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Editar Entrada
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieEdit;
