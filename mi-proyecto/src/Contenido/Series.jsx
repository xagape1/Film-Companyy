import React, { useEffect, useState } from 'react';
import tmdb from '../api/tmdb';
import "./Series.css";
import SeriesCard from './SeriesCard';
import Header from '../Layout/Header';
import { useNavigate } from 'react-router-dom';

const Series = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    console.log("movies");
    navigate('/');
  };

  const [series, setSeries] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const fetchSeries = async (searchKey) => {
    try {
      const response = await tmdb.get(searchKey ? 'search/tv' : 'tv/popular', {
        params: {
          query: searchKey
        }
      });
      setSeries(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  const searchSeries = (e) => {
    e.preventDefault();
    fetchSeries(searchKey);
  };

  return (
    <div>
      <div className="container">
        <div className="inline-div" style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <img className="left-logo" src="/images/logosinfilm.png" alt="Logo" />
          </div>
          <div>
            <h2 className="left">Film Company</h2>
          </div>
        </div>
        <div className="right">
          <Header />
        </div>
      </div>
      <form className="container mb-4 search-form" onSubmit={searchSeries}>
        <div className="search-input-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search Content"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="boton search-button">Search</button>
          <div>
            <button className="button-link" onClick={handleButtonClick}>Movies</button>
          </div>
        </div>
      </form>
      <div className="series-container">
        {series.map((serie, index) => {
          return <SeriesCard key={index} {...serie} />;
        })}
      </div>
    </div>
  );
};

export default Series;
