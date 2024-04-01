import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login as LoginIcon, Person as PersonIcon } from '@mui/icons-material';
import Loginanimation from './animation/Login.json';
import styles from './style.module.css';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [mail, setMail] = useState('');
  const [pwd, setPassword] = useState('');

  const navigate = useNavigate();
  const handleLogin = () => {
    const { REACT_APP_USER, REACT_APP_PWD } = process.env;
    if (mail === REACT_APP_USER && pwd === REACT_APP_PWD) {
      toast.success('Login Success', { position: 'top-right', autoClose: 5000 });
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } else {
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className={styles.Loginmain}>
      <div className={styles.left}>

        <h2>Welcome Back! <PersonIcon className={styles.sp} /></h2>
        <br />
        <input value={mail} onChange={(e) => setMail(e.target.value)} type="text" placeholder='Email' />
        <br />
        <input value={pwd} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
        <br />
        <button onClick={handleLogin}>Login <LoginIcon /></button>
      </div>

      <div className={styles.right}>
        <Lottie className={styles.animation} animationData={Loginanimation} loop={true} />
      </div>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
    </div>
  );
};

export default Login;
