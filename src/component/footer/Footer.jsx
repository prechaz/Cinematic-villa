import React from "react";
import styles from "./footer.module.css";
import { useState } from "react";
import logo from '../../assest/Capture.PNG'

function Footer() {
  const [password, setPassword] = useState("");
  return (
    <div className={styles.footer}>
    <div className={styles.subscribe}>
    <input
        type="password"
        className={styles.input}
        placeholder="your email will be here"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.btn}>subscribe now</button>
      
    </div>
    <div className={styles.head}>
        <img className={styles.logo} src={logo} alt="logo"/>
        <h1 className={styles.title}>CINEMATIC VILLA</h1>
      </div>
    </div>

  );
}

export default Footer;
