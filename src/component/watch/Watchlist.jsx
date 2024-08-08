import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import styles from "./watchlist.module.css";
import { doc, getDoc, updateDoc, arrayUnion, collection } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Import your Firebase instance (make sure to adjust the path)

function Watchlist({ userId, setmovieid }) {
  const [watchList, setWatchList] = useState([]);

  // Function to get the user's watchlist from Firestore
  const getWatchlist = async () => {
    try {
      const userDocRef = doc(collection(db, "users"), userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setWatchList(userData.watchlist || []);
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error.message);
    }
  };

  useEffect(() => {
    // Call getWatchlist only if userId is defined
    if (userId) {
      getWatchlist();
    }
  }, [userId]);

  // Function to add a movie to the user's watchlist in Firestore
  const addToWatchlist = async (movie) => {
    try {
      const userDocRef = doc(collection(db, "users"), userId);
      await updateDoc(userDocRef, {
        watchlist: arrayUnion(movie),
      });

      // Update the local state after adding to the watchlist
      setWatchList((prevWatchlist) => [...prevWatchlist, movie]);
    } catch (error) {
      console.error("Error adding to watchlist:", error.message);
    }
  };

  return (
    <div className={styles.film}>
      <h2 className={styles.title}>MY WatchList</h2>
      <ul>
        {watchList.map((movie) => (
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
  );
}

export default Watchlist;

