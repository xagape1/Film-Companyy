import React from 'react';
import { Link } from 'react-router-dom';
import './SeriesCard.css';
import ProgressCircle from '../baseUI/progress-circle';

const getPosterURL = (posterpath) => {
  return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`;
}

const SeriesCard = ({ id, poster_path, name, title, releases_date,vote_average, first_air_date }) => {
  return (
    <div className="series-card">
      <img src={getPosterURL(poster_path)} alt={name} className='series-card__image' />
      <div className='series-card__content'>
        <h1 className='series-card__title'>{name || title}</h1>
        <p className='series-card__date'>{first_air_date || releases_date}</p>

        <div className='circle'>
          <ProgressCircle percent={vote_average} /> 
        </div>

      </div>
    </div>
  )
}

export default SeriesCard;
