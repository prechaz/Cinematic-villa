import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import styles from "./latest.module.css";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTNlNWU3MjMxMDIxYWY3MzA3NjBmNjhjZDA5YWQwZCIsInN1YiI6IjY1ODc2YmY3MDcyMTY2NjcyOWE1YTM4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XrEvWjWsvzQf5bN6sSPyARDruDlYuX8KpCNOL_7f_ME",
  },
};

function Latest({setmovieid}) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'",
          options
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.results);
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <ul className={styles.list}>
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
    </>
  );
}

export default Latest;
