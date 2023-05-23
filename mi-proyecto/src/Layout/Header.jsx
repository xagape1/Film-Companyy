import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./Header.css"

const Header = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [error, setError] = useState("");
  let [username, setUsername] = useState("");
  let [roles, setRoles] = useState([]);
  let { usuari, setUsuari } = useContext(UserContext);
  let { usuariId, setUsuariId } = useContext(UserContext);

  const getUser = async () => {
    try {
      const data = await fetch("http://127.0.0.1:8000/api/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "GET",
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        setUsername(resposta.user.name);
        setRoles(resposta.roles);
        setUsuari(resposta.user.email)
        setUsuariId(resposta.user.id)
        // console.log(usuari);

      }
      else setError(resposta.message);
    } catch {
      console.log("Error");
      alert("Catchch");
    };

  }
  useEffect(() => {
    getUser();
  }, []);

  const sendLogout = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch("http://127.0.0.1:8000/api/logout", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "POST",
        body: JSON.stringify({})
      });
      const resposta = await data.json();
      if (resposta.success === true)
        setAuthToken("");
      else alert("La resposta no ha triomfat");
    } catch {
      console.log("Error");
      alert("Catchch");
    };
  }
  return (
    <header className="header-container">
      <div className='espacio'>
        <button  onClick={(e) => {
          sendLogout(e);
        }}>
          {username} - {((v) => (<span key={v}> {v} </span>))} Logout 
        </button>
      </div>
    </header>
  );


}

export default Header
