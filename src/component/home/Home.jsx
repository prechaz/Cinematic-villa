import React, { useEffect } from "react";
import styles from './home.module.css'
import Action from "../genres/Action";
import Crime from "../genres/Crime";
import Thriller from "../genres/Thriller";
import Comedy from "../genres/Comedy";


function Home({setmovieid}) {

  return (
    <section className={styles.film}>
    <Action  setmovieid={setmovieid}/>
    <Crime  setmovieid={setmovieid}/>
    <Thriller  setmovieid={setmovieid}/>
    <Comedy  setmovieid={setmovieid}/>


    </section>
  );
}


export default Home;
