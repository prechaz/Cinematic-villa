import React, { useState, useEffect } from "react";
import styles from "./nav.module.css";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase/firebase";
import logo from "../../assest/Capture.PNG";

function Nav() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    console.log("Checking login status on mount");
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    console.log("userLoggedIn from localStorage:", userLoggedIn);

    if (userLoggedIn) {
      const { isLoggedIn, userName } = JSON.parse(userLoggedIn);
      console.log("User logged in:", isLoggedIn, userName);
      setIsLoggedIn(isLoggedIn);
      setUserName(userName);
    }

    console.log('isLoggedIn or userName changed:', isLoggedIn, userName);
  }, [isLoggedIn, userName]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userLoggedIn");
      navigate('/');
      setIsLoggedIn(false);
      setUserName('');
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  console.log("Rendering with:", isLoggedIn, userName);

  return (
    <nav>
      <img className={styles.logo} src={logo} alt="Logo" />
      {isLoggedIn && (
        <div className={styles.link}>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/discover">Discover</NavLink>
          <NavLink to="/latest">Latest</NavLink>
          <NavLink to="/rated">Top Rated</NavLink>
          <NavLink to="/watchlist">My Watchlist</NavLink>
        </div>
      )}
      <div className={styles.buttons}>
        {isLoggedIn ? (
          <>
            <button className={styles.login}>{userName}</button>
            <button className={styles.signup} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className={styles.login} onClick={() => navigate("/")}>
              Login
            </button>
            <button className={styles.signup} onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
