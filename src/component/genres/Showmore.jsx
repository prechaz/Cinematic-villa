import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import style from "./showmore.module.css";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTNlNWU3MjMxMDIxYWY3MzA3NjBmNjhjZDA5YWQwZCIsInN1YiI6IjY1ODc2YmY3MDcyMTY2NjcyOWE1YTM4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XrEvWjWsvzQf5bN6sSPyARDruDlYuX8KpCNOL_7f_ME",
  },
};

function Showmore({setmovieid}) {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          options
        );
        const data = await response.json();

        setGenres(data.genres);
        console.log(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        );
        const data = await response.json();

        // Replace with the actual genre ID for "Action"
        const actionGenreId = 28;

        // Filter movies for the "Action" genre (assuming genre IDs are in an array)
        const filteredMovies = data.results.filter((movie) =>
          movie.genre_ids.includes(actionGenreId)
        );
        console.log(filteredMovies);

        setMovies(filteredMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchGenres();
    fetchMovies();
  }, []);
  function handleClick(){
      navigate('/')
  }
  return (
    <>
      <div className={style.movie}>
        <div className={style.heading}>
          <h1 onClick={handleClick} className={style.title}><MdOutlineArrowBack /></h1>

        </div>
        {/* Display the filtered movies */}
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Card
                image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                name={movie.title}
                movieid={movie.id}
            setmovieid={setmovieid}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Showmore;
