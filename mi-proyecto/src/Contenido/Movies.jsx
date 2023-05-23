import { useEffect } from 'react';
import axios from 'axios'
import "./Movies.css";
import { useState } from 'react';
import YouTube from 'react-youtube';
import Header from '../Layout/Header';
import { useNavigate } from 'react-router-dom';


const Movies = () => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log("series");
    navigate('/series');
  };

  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "66d0445880766ce11eae51e58a874209";
  const LANGUAGE = "es-ES";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  // funcion para realizar la peticion get a la api
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
        query: searchKey,
      },
    });

    //console.log('data',results);

    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  // funcion para la peticion de un solo objeto y mostrar en reproductor de videos
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    //return data
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    // const data = await fetchMovie(movie.id)
    // console.log(data);
    // setSelectedMovie(movie)
    fetchMovie(movie.id);

    setMovie(movie);
    window.scrollTo(0, 0);
  };

  // funcion para buscar peliculas
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div>
      <div>
        <div className="container" ><div className='inline-div' style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <img className="left-logo" src="/images/logosinfilm.png" alt="Logo" />
          </div>
          <div>
            <h2 className="left"> Film Company </h2>
          </div>
        </div>
          <div className="right">
            <Header />
          </div>
        </div>
        <form className="container mb-4 search-form" onSubmit={searchMovies}>
          <div className="search-input-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search Content"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button className="boton search-button">Search</button>

            <div>
              <button className="button-link" onClick={handleButtonClick}>Series</button>
            </div>

          </div>
        </form>

        <div>
          <main>
            {movie ? (
              <div
                className="viewtrailer"
                style={{
                  backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                }}
              >
                {playing ? (
                  <>
                    <YouTube
                      videoId={trailer.key}
                      className="reproductor container"
                      containerClassName={"youtube-container amru"}
                      opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                          autoplay: 1,
                          controls: 0,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                    <button onClick={() => setPlaying(false)} className="boton">
                      Close
                    </button>
                  </>
                ) : (
                  <div className="container">
                    <div className="">
                      {trailer ? (
                        <button
                          className="boton"
                          onClick={() => setPlaying(true)}
                          type="button"
                        >
                          Play Trailer
                        </button>
                      ) : (
                        "Sorry, no trailer available"
                      )}
                      <h1 className="text-white">{movie.title}</h1>
                      <p className="text-white">{movie.overview}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </main>
        </div>


        <div className="container mt-3 movie-container">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => selectMovie(movie)}
            >
              <img
                src={`${URL_IMAGE + movie.poster_path}`}
                alt=""
                height={600}
                width="100%"
              />
              <h4 className="text-center">{movie.title}</h4>
            </div>
          ))}
        </div>



      </div>
    </div>
  )
}

export default Movies
