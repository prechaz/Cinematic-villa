import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {auth} from '../firebase/firebase'
import styles from './signup.module.css'

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        try {
          // Using the auth instance for authentication
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          // User signed up successfully
          const user = userCredential.user;
          // Update user's display name
          await updateProfile(user, {
            displayName: name,
          });
      
          // Save user details to local storage
          console.log('Saving to local storage...');
          localStorage.setItem('userDetails', JSON.stringify({
            userId: user.uid,
            displayName: user.displayName,
            email: user.email,
          }));
      
          console.log('User signed up:', user);
          // Redirect to success page or dashboard
          navigate('/'); // Update the route as needed
        } catch (error) {
          setError(error.message);
        }
      };
      


       
  return (
    
       <div className={styles.login}>
      <h2 className={styles.head}>Signup</h2>
      <div className={styles.inputfield}>
      <input
        type="text"
        placeholder="Name"
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> <br/>
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
        <button className={styles.btn} onClick={handleSignUp}>
          Signup
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
      
  )
}

export default Signup
