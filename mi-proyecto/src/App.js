import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import YouTube from 'react-youtube';
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./userContext";

import LoginRegister from './auth/LoginRegister';
import Header from './Layout/Header';
import NotFound from "./NotFound";

import Movies from "./Contenido/Movies";
import Series from './Contenido/Series';
import SeriesCard from './Contenido/SeriesCard';

import Movie from './movies/Movie';
import { MoviesAdd } from './movies/MoviesAdd';
import MovieEdit from './movies/MovieEdit';

import MoviesGrid from './movies/MoviesGrid';
import MovieGrid from './movies/MovieGrid';

import MoviesMenu from './movies/MoviesMenu';

function App() {
  const [authToken, setAuthToken] = useState("");
  const [usuari, setUsuari] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [usuariId, setUsuariId] = useState("");

  return (
    <UserContext.Provider value={{ refresh, setRefresh, usuari, setUsuari, authToken, setAuthToken, usuariId, setUsuariId }}>
      {authToken ?
        <>
          <Router>
            <Routes>
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<><MoviesMenu/><Movie /></>} />
              <Route path="/movies/add" element={<><MoviesMenu/><MoviesAdd /></>} />
              <Route path="/movies/edit/:id" element={<><MoviesMenu/><MovieEdit /></>} />
              <Route path="/movies/grid" element={<><MoviesMenu/><MoviesGrid /></>} />
              <Route path="/" element={<><MoviesMenu/><Movies /></>} />
              <Route path="/series" element={<Series />} />
            </Routes>
          </Router>
        </>
        :
        <LoginRegister />
      }
    </UserContext.Provider>
  );
}

export default App;
