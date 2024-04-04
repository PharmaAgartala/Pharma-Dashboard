import React from 'react'
import styles from "./style.module.css"
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
const Navbar = () => {
  const { auth, setAuth } = useGlobalContext();
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const Logout = () => {
    setAuth(false);
    toast.info('Logout Success', { position: 'top-right', autoClose: 2000 });
    setTimeout(() => {
      navigate("/");

    }, 2000);
  }
  return (
    <div className={styles.main} >
      <p>
        {formattedDate}
      </p>
      <div className={styles.buttons} >
        <button>
          {process.env.REACT_APP_USER}
        </button>
        <button  onClick={Logout} >
          {/* <Link to="/"> */}
          <LogoutIcon className={styles.text} />
          {/* </Link> */}
          
        </button>
      </div>
    </div>
  )
}

export default Navbar