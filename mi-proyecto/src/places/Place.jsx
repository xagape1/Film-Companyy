import React from 'react'
import { UserContext } from "../userContext";
import { useState, useEffect,useContext } from 'react';
import { useParams,useNavigate,useLocation } from 'react-router-dom';
import ReviewList from './reviews/ReviewList';
// import PlaceMarks from './PlaceMarks';
// import { placeMarkReducer } from './placeMarkReducer';
// import { useReducer } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { addMark } from '../slices/placeMarkSlice.';
import { setError } from './reviews/slices/reviewSlice';
import { ismarked } from '../slices/placeMarkSlice.';
import { getPlace,delPlace,comprovarFavorite,eliminarFavorite,darFavorite } from '../slices/places/thunks';
// const initialState = [];

const Place = () => {
  let { authToken, setAuthToken, refresh, setRefresh,usuari, setUsuari } = useContext(UserContext);
  // let [error, setError] = useState("");
  const { id } = useParams();
  // let [loading, setLoading] = useState(true);
  // let [place, setPlace] = useState([])
  let navigate = useNavigate();
  // let [favorite, setFavorite] = useState(null);
  const { isSaving = true, error ,isLoading,place,favorite } = useSelector((state) => state.places);

  //  const init = () => {
  //    return JSON.parse(localStorage.getItem("marks")) || []
  //  }
  //  const [marks, dispatchMark] = useReducer(placeMarkReducer, initialState, init);

  const { marks, isMarked } = useSelector(state => state.marks)
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('marks', JSON.stringify(marks))
  }, [marks])
  console.log("marks: "+marks)

  const { pathname } = useLocation()

  useEffect(() => {
    // getPlace();
    dispatch(getPlace(authToken,id))
    dispatch(comprovarFavorite(authToken,id));
    dispatch(ismarked(id))
  }, [marks]);

  // const addMark = () => {


  const data = {
    "id": place.id,
    "name": place.name,
    "description": place.description,
    "ruta": pathname
  }

  return (

    <>
      {isLoading ?
        "cargando..."
        :
        <>
          <div class="card">
            <div class="card-header">
              <img class="img-fluid" src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} title="Image preview" width="300px" />
              <table class="table">
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{place.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{place.name}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{place.description}</td>
                  </tr>
                  <tr>
                    <td>Lat</td>
                    <td>{place.latitude}</td>
                  </tr>
                  <tr>
                    <td>Lng</td>
                    <td>{place.longitude}</td>
                  </tr>
                  <tr>
                    <td>Author</td>
                    <td>{place.author.name}</td>
                  </tr>

                </tbody>
              </table>
              {usuari == place.author.email ?
                <>
                  <button onClick={(e) => { navigate("/places/edit/" + place.id) }}>📝</button>
                  <button onClick={(e) => { dispatch(delPlace(authToken,navigate,place.id)) }}>🗑️</button>
                </>
                : <></>}{isMarked ?
                  <button>DESAT</button>
                  :
                  <button onClick={() => {
                    dispatch(addMark(data))
                  }}>DESA</button>
              }

              {favorite ?
                <button onClick={(e) => { e.preventDefault,dispatch(darFavorite(authToken,id)) }}>⭐</button>
                :
                <>
                {console.log(id)}
                <button onClick={(e) => { e.preventDefault,dispatch(eliminarFavorite(authToken,id)) }}>⭐❌</button>
                </>
              }
            </div>

          </div>
          <ReviewList id={place.id}/>
        </>

      }
    </>
  )


}

export default Place
