import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { setFilter } from '../slices/movies/movieSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const MoviesMenu = () => {
const { filter } = useSelector((state) => state.movies);

const dispatch= useDispatch();
   const { formState, onInputChange } = useForm({

    filtrar: "",

   });
   const { filtrar } = formState
  return (
    <div className="menu">
       <Link className='click blue' to="/movies/add">Afegir Entrada</Link>
       <Link className='click orange' to="/movies/grid">Grid</Link>

       <input type="text" name="filtrar" placeholder='filtrar por title' onChange={onInputChange}></input>
       <button className="btn btn-primary" onClick={(e) => {dispatch(setFilter({...filter,title:formState.filtrar}))}}>Find</button>
       <button className="btn btn-primary" onClick={(e) => {dispatch(setFilter({title:"",gender:""}))}}>Limpiar filtros</button>
    </div>
  )
}

export default MoviesMenu
