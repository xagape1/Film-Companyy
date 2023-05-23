import React from 'react';
import { Link } from 'react-router-dom';
import './SeriesCard.css';

const getPosterURL = (posterpath) => {
  return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`;
}

const SeriesCard = ({ id, poster_path, name, first_air_date }) => {
  return (
    <div className="series-card">
        <img src={getPosterURL(poster_path)} alt={name} className='series-card__image' />
        <div className='series-card__content'>
          <h1 className='series-card__title'>{name}</h1>
          <p className='series-card__date'>{first_air_date}</p>
        </div>
    </div>
  )
}

export default SeriesCard;
