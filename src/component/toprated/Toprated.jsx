import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import styles from './toprated.module.css'
import { ColorRing } from "react-loader-spinner";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTNlNWU3MjMxMDIxYWY3MzA3NjBmNjhjZDA5YWQwZCIsInN1YiI6IjY1ODc2YmY3MDcyMTY2NjcyOWE1YTM4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XrEvWjWsvzQf5bN6sSPyARDruDlYuX8KpCNOL_7f_ME",
  },
};

function Toprated({ setmovieid }) {
  const [movies, setmovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchmovies = async () => {
      try {
        const res = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data.results);
        setmovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchmovies();
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return (
    <div>
      {loading ? (
        <div className={styles.centered}>
          <ColorRing
            visible={true}
            height="200"
            width="200"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default Toprated;
