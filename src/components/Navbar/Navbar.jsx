import React from 'react'
import styles from "./style.module.css"
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className={styles.main} >
      <button>
        {process.env.REACT_APP_USER}
      </button>
      <button>
        <Link to="/">
        <LogoutIcon className={styles.text} />
        </Link>
      </button>
    </div>
  )
}

export default Navbar