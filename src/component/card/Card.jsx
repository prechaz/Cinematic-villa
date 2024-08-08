import React from 'react'
import styles from  './card.module.css'

import { useNavigate } from 'react-router-dom'

function Card({image ,name ,setmovieid,movieid}) {
const navigate = useNavigate()
async function handleClick() {
  console.log(movieid);

  if (setmovieid) {
    await setmovieid(movieid);
    navigate(`/showdetail/${movieid}`);
  }
}

  return (
    <div className={styles.card}>
    <img src={image} className={styles.img} alt='image' />
    <div className={styles.seriesInfo}>
    <h2 className={styles.seriesName}>{name}</h2>
    <button className= {styles.viewbtn} onClick={handleClick}> View Details </button>
      </div>
    

      
    </div>
  )
}

export default Card
