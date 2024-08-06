import axios from 'axios';
import React, { useRef ,useContext} from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';
import "./login.css";
import styles from "./styles.module.css";


export default function Login() {
  const userRef=useRef();
  const passwordRef=useRef();

  const{dispatch,isFecthing}=useContext(Context);
  const handleSubmit=async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_STSRT"});
    try {
      const res=await axios.post("/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value,
      });
      console.log(899);
      dispatch({type:"LOGIN_SUCCESS",payload:res.data});
    } catch (error) {
      console.log(error.response.data);
      dispatch({type:"LOGIN_FAILURE"});
    }
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="text" className={styles.input} placeholder='Enter your username' 
              ref={userRef}
            />
            <input type="password" className={styles.input} placeholder='Enter your password....' 
               ref={passwordRef}
            />
            <button className={styles.green_btn} type='submit' disabled={isFecthing}>Login</button>
          </form>
        </div>
        <div className={styles.right}>
          <h3>New Here ?</h3>
          <Link className='link' to='/register'>
            <button className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
