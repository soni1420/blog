import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react'
import "./topbar.css";
import { Context } from '../../context/Context';
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Topbar() {
  const {user,dispatch}=useContext(Context);
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)
  const PF="http://localhost:5000/imgs/";
  const handlelogout=(e)=>{
    dispatch({type:"LOGOUT"});
  };
  return (
    <header>
        <nav className='navbar'>
          <div className='logo'>
            <h2>Blogify</h2>
          </div>
          <ul className={click ? "nav-menu active" : 'nav-menu'}>
            <li className='nav-item'><Link to="/" className='nav-link'>Home</Link></li>
            <li className='nav-item'><Link to="/about" className='nav-link'>About</Link></li>
            <li className='nav-item'><Link to="/contact" className='nav-link'>Contact</Link></li>
            <li className='nav-item'><Link to="/write" className='nav-link'>Write</Link></li>
            {user && 
              <button className="white_btn" onClick={handlelogout}>Logout</button>
            }
          </ul>
        <div className='topright'>
          {user?(
            <Link to="/settings">
              {/* <img className="topimage" 
              src={PF+user.profilePic}
              alt="" /> */}
            </Link>
          ):(
            <div className='authbtn'>
              <Link to="/login" className='link'>
                <button className='loginbtn'>Log In</button>
              </Link>
              {/* <Link to="/register" className='link'>
                <button className='signupbtn'>Sign Up</button>
              </Link> */}
            </div>
          )}
        </div>
    <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={20} style={{ color: '#ffffff' }} />) : (<FaBars size={20} style={{ color: '#ffffff' }} />)}
                </div>
            </nav>
        </header>
  )
}
