import React, { useState ,useEffect} from 'react'
import Header from '../../components/header/header'
import Posts from '../../components/posts/posts'
import axios from "axios";
import {useLocation} from "react-router-dom";
import "./home.css"

export default function Home() {
  const [posts,setPosts]=useState([]);
  const {search}=useLocation();
  useEffect(()=>{
    const fetchPosts= async ()=>{
      const res=await axios.get("/posts"+search);
      setPosts(res.data); 
    }
    fetchPosts();
  },[search])
  return (
    <>
      <Header/>
      <div className='home'>
        <Posts posts={posts}/>
      </div>
    </>
  )
}
