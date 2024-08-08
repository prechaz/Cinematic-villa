import React from "react";
import styles from "./discover.module.css";
import Card from "../card/Card";
import { useState } from "react";
import { useEffect } from "react";
import Showdetail from "../showdetails/Showdetail";
import { ColorRing } from "react-loader-spinner";


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTNlNWU3MjMxMDIxYWY3MzA3NjBmNjhjZDA5YWQwZCIsInN1YiI6IjY1ODc2YmY3MDcyMTY2NjcyOWE1YTM4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XrEvWjWsvzQf5bN6sSPyARDruDlYuX8KpCNOL_7f_ME",
  },
};

function Discover({movie,setmovie,setmovieid}) {
  const [search, setsearch] = useState("a");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchmovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
          options
        );
        const data = await res.json();
        console.log(data.results);
        setmovie(data.results);
        setLoading(false)

      } catch (error) {
        setLoading(false)
      }
    };
    fetchmovie();
  }, [search]);
  return (
    <>
      <div className={styles.searchbar}>
        <input
          type="text"
          onChange={(e) => setsearch(e.target.value)}
          className={styles.search}
          placeholder="Search movie........"
        />
      </div>
      {loading ? (        <div className={styles.centered}>
      <ColorRing
        visible={true}
        height="200"
        width="200"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>):(<div className={styles.results}>
      <ul className={styles.list}>
        {movie.map((movie) => (
          <li  key={movie.id}>
            
            <Card
              image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              name={movie.title} 
              movieid={movie.id}
              setmovieid={setmovieid}
            />
          </li>
        ))}
      </ul>
      </div>)}


    </>
  );
}

export default Discover;
