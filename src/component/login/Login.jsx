import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [, forceUpdate] = useState();
  const handleLogin = async () => {
    try {
      const userdata = await signInWithEmailAndPassword(auth, email, password);
      const user = userdata.user;
  
      // Log user data
      console.log('User data:', user);
  
      // Check and log values before setting in local storage
      const userLoggedInData = { isLoggedIn: true, userName: user.displayName };
      console.log('Data to be stored in local storage:', userLoggedInData);
  
      // Set userLoggedIn status in local storage with user's name
      localStorage.setItem('userLoggedIn', JSON.stringify(userLoggedInData));
  
      // Set state variables
      setIsLoggedIn(true);
      setUserName(user.displayName);
  
      console.log('Login successful!');
          // Force re-render
    forceUpdate(Math.random());

      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('Invalid email or password. Please try again.');
    }
  };
  

  return (
    <div className={styles.login}>
      <h2 className={styles.head}>Login</h2>
      <div className={styles.inputfield}>
        <input
          type="email"
          className={styles.input}
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className={styles.btn} onClick={handleLogin}>
          Login
        </button>

        {error && <p className={styles.error}>{error}</p>}
        <div>
        <Link to="/forgotten">Forgotten Password?</Link>
        <Link to="/signup">Create New account</Link>

        </div>
        
      </div>
    </div>
  );
};

export default Login;