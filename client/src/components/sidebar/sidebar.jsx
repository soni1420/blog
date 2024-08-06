import { useEffect,useState} from 'react';
import "./sidebar.css"
import axios from "axios"
import {Link} from "react-router-dom";

export default function Sidebar() {
  const [cat,setCat]=useState([]);
  useEffect(()=>{
    const getCats= async ()=>{
      const res= await axios.get("/categories");
      setCat(res.data);
    }
    getCats();
  },[])
  console.log(cat);
  return (
    <div className='sidebar'>
         <div className='sideBarItem'>
            <span className='sideBarTitle'>ABOUT ME</span>
            <img
                className='sidebarimg'
                src="https://cdn.icon-icons.com/icons2/2859/PNG/512/avatar_face_man_boy_male_profile_smiley_happy_people_icon_181658.png"
                alt=""
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eveniet delectus veniam iure officiis aperiam.
            </p>
         </div>
         <div className="sideBarItem sidebarcat">
          <span className="sideBarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            {cat.map((c,idx)=>(
              <Link to ={`/?cat=${c.name}`} className="link" key={idx}>
                <li className="sidebarListItem">{c.name}</li>
              </Link>
            ))}
          </ul>
         </div>
         <div className="sideBarItem">
            <span className="sideBarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
              <i className="sidebarIcon topicon fa-brands fa-square-facebook"></i>
              <i className="sidebarIcon topicon fa-brands fa-square-twitter"></i>
              <i className="sidebarIcon topicon fa-brands fa-square-pinterest"></i>
              <i className="sidebarIcon topicon fa-brands fa-square-instagram"></i>
            </div>
         </div>
    </div>
  )
}
