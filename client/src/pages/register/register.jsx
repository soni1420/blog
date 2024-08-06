import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./register.css"
import axios from "axios"
import styles from "./styles.module.css";

export default function Register() {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(false);

  
  const handleSubmit=async (e)=>{
    setError(false);
    e.preventDefault();
    try {
      const res=await axios.post("/auth/register",{
        username,email,password
      });
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.right}> 
        <h1>Create account</h1>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <input type="text" className={styles.input} placeholder='Enter your username....' 
              onChange={e=>setUsername(e.target.value)} />
            <input type="email" className={styles.input} placeholder='Email' 
              onChange={e=>setEmail(e.target.value)} />
            <input type="password" className={styles.input} placeholder='Password' 
              onChange={e=>setPassword(e.target.value)} />
            <button className={styles.green_btn} type='submit'>Sign Up</button>
          </form>
        </div>
        <div className={styles.left}>
          <h3>Already have an account?</h3>
          <Link className='link' to='/login'>
            <button className={styles.white_btn}>
              Log In
            </button>
            </Link>
            {error && <span style={{color:"red",marginTop:"10px"}}>Something went wrong!</span>}
        </div>
      </div>
    </div>
  )
}
