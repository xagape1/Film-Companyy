import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { delPlace } from '../slices/places/thunks';
import Paginate from './Paginate';
// const PlaceList = ({ place , deletePlace}) => {

const PlaceList = ({place}) => {
    let { authToken, setAuthToken } = useContext(UserContext);
    let {usuari, setUsuari} = useContext(UserContext);
    let navigate = useNavigate();

    return (
        <>
            <td>{place.name}</td>
            <td>{place.description}</td>
            <td>{place.latitude}</td>
            <td>{place.longitude}</td>
            <td>{place.visibility.name}</td>
            <td>{place.author.name}</td>
            <td>❤️{place.favorites_count}</td>
            <td><button onClick={(e) => {navigate("/places/"+place.id)}}>👁️</button>
                {usuari == place.author.email ?
                    <>
                        <button onClick={(e) => {navigate("/places/edit/"+place.id)}}>📝</button> 
                        <button onClick={(e) => {dispatch(delPlace(place.id))}}>🗑️</button>
                    </>
                    : <></>}    
                    </td>
        </>
    )
}

export default PlaceList
