import React, { useState } from 'react'
import Lottie from "lottie-react";
import styles from "./style.module.css"
import Loginanimation from "./animation/Login.json"
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
const Login = () => {
  const [mail, setmail] = useState("");
  const [pwd, setPassword] = useState("");
  return (
    <div className={styles.Loginmain} >
      <div className={styles.left} >
        <h2>Login  <PersonIcon className={styles.sp} /> </h2>
        <br />
        {/* <label htmlFor="mail">Email</label> */}
        <input type="text" placeholder='Email' />
        <br />
        {/* <label htmlFor="password"></label> */}
        <input type="password" placeholder='Password' />
        <br />
        <button>Login <LoginIcon/> </button>
      </div>
      <div className={styles.right} >
        <Lottie className={styles.animation} animationData={Loginanimation} loop={true} />;
      </div>
    </div>
  )
}

export default Login