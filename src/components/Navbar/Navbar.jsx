import React from 'react'
import styles from "./style.module.css"
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className={styles.main} >
      <p>
        {formattedDate}
      </p>
      <div className={styles.buttons} >
      <button>
        {process.env.REACT_APP_USER}
      </button>
      <button>
        <Link to="/">
        <LogoutIcon className={styles.text} />
        </Link>
      </button>
      </div>
    </div>
  )
}

export default Navbar