import React, { useState } from 'react'
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { MoviesMenu } from './MoviesMenu';


export const Places = () => {
    const navega = useNavigate()
    useEffect ( ()=> {
        navega("/movies/grid")

    },[])
 
    return (
    <>
    

    </>      
    
  )
}
