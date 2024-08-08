import React, { useState, useEffect } from "react";
import styles from "./showdetails.module.css";
import { CiStar } from "react-icons/ci";
import { ColorRing } from "react-loader-spinner";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTNlNWU3MjMxMDIxYWY3MzA3NjBmNjhjZDA5YWQwZCIsInN1YiI6IjY1ODc2YmY3MDcyMTY2NjcyOWE1YTM4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XrEvWjWsvzQf5bN6sSPyARDruDlYuX8KpCNOL_7f_ME",
  },
};

function Showdetail({ watchList, setWatchList }) {
  const [moviedetails, setmoviedetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { movieid } = useParams();

  useEffect(() => {
    console.log("Fetching movie details for ID:", movieid);

    async function fetchdetails() {
      try {
        if (!movieid) {
          console.error("Movie ID is undefined.");
          return;
        }

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieid}?language=en-US`,
          options
        );
        const data = await res.json();
        console.log("Fetched movie details:", data);
        setmoviedetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    }

    fetchdetails();
  }, [movieid]);

  useEffect(() => {
    // Check if there is a watchlist in local storage
    const storedWatchList = JSON.parse(localStorage.getItem("watchList")) || [];

    // Set the initial watchlist state
    setWatchList(storedWatchList);

    console.log("Initial Watch List:", storedWatchList);
  }, [setWatchList]);

  const addToWatchList = (moviedetails) => {
    try {
      // Update the watchlist state
      setWatchList((prevWatchList) => {
        const isMovieInWatchList = prevWatchList.some(
          (movie) => movie.id === moviedetails.id
        );

        let updatedWatchList;

        if (!isMovieInWatchList) {
          updatedWatchList = [...prevWatchList, moviedetails];
        } else {
          updatedWatchList = prevWatchList.filter(
            (movie) => movie.id !== moviedetails.id
          );
        }

        console.log("Updated Watch List:", updatedWatchList);

        // Update local storage
        localStorage.setItem("watchList", JSON.stringify(updatedWatchList));

        return updatedWatchList;
      });
    } catch (error) {
      console.error("Error in addToWatchList:", error);
    }
  };

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('https://image.tmdb.org/t/p/original/${moviedetails.backdrop_path || ''}')`,
    backgroundSize: "cover",
    backgroundPosition: "left",
    height: "700px",
    width: "100%",
    float: "right",
    transition: "all 1s ease-in-out",
  };

  function handleClick() {
    navigate(-1);
  }

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
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <>
          <div style={backgroundStyle}>
            <button onClick={handleClick} className={styles.backbtn}>
              <MdOutlineArrowBack className={styles.icon} />
            </button>
            <h1 className={styles.title}>{moviedetails.original_title}</h1>
            <div className={styles.review}>
              <div className={styles.rating}>
                {" "}
                {parseFloat(moviedetails.vote_average).toFixed(1)}
              </div>
              <div>{`(TMDB) release-date: ${moviedetails.release_date}`}</div>
              <div className={styles.genres}>
                {moviedetails &&
                  moviedetails.genres &&
                  moviedetails.genres.length > 0 &&
                  moviedetails.genres[0].name}
              </div>
            </div>
            <div className={styles.desc}>{moviedetails.overview}</div>
            <div className={styles.detail}>
              Status:{" "}
              <span className={styles.dtopic}>{moviedetails.status}</span>
            </div>
            <div className={styles.detail}>
              Genres:{" "}
              <span className={styles.dtopic}>
                {moviedetails &&
                  moviedetails.genres &&
                  moviedetails.genres.length > 0 &&
                  moviedetails.genres[0].name}
              </span>
            </div>
            <div className={styles.detail}>
              Runtime:{" "}
              <span className={styles.dtopic}>{moviedetails.runtime}m</span>
            </div>
            <button
              className={styles.watch}
              onClick={() => addToWatchList(moviedetails)}
            >
              {moviedetails &&
              watchList.some((movie) => movie.id === moviedetails.id) ? (
                "Remove from Watch List"
              ) : (
                <span className={styles.pen}>
                  <CiStar className={styles.pen} />
                  add to Watchlist
                </span>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Showdetail;
