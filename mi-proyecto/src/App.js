import { useEffect } from 'react';
import axios from 'axios'
import './App.css';
import { useState } from 'react';
import YouTube from 'react-youtube';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./userContext";


import LoginRegister from './auth/LoginRegister'
import Header from './Layout/Header';
import NotFound from "./NotFound";

import Movies from "./Contenido/Movies";
import Series from './Contenido/Series';
import SeriesCard from './Contenido/SeriesCard';


import Movie from './movies/Movie';
import MovieCreate from './movies/MovieCreate';
import MovieEdit from './movies/MovieEdit';

import MoviesGrid from './movies/MoviesGrid';
import MovieGrid from './movies/MovieGrid';


function App() {

  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");
  let [refresh, setRefresh] = useState(false);
  let [usuariId, setUsuariId] = useState("");

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ refresh, setRefresh, usuari, setUsuari, authToken, setAuthToken, usuariId, setUsuariId }}>
        {authToken ?
          <>
            <Routes>

              <Route path="/movies/:id" element={<Movie />} />
              <Route path="/movies/add" element={<MovieCreate />} />
              <Route path="/movies/edit/:id" element={<MovieEdit />} />
              <Route path="/movies/grid" element={<MoviesGrid />} />

              <Route path="/" element={< Movies />} />
              <Route path="/series" element={< Series />} />
            </Routes>
          </>
          :
          <LoginRegister />
        }
      </UserContext.Provider>
    </BrowserRouter>

  );
}

export default App;
