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
                <Route path="" element={< Movies/>} />

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
