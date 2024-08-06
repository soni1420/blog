import React, { useContext } from 'react'
import "./singlePost.css"
import {Link, useLocation} from "react-router-dom";
import { useEffect ,useState} from 'react';
import axios from "axios"
import { Context } from '../../context/Context';
import parse from "html-react-parser";
// import TextEditor from '../TextEditor';

export default function SinglePost() {
  const {user}=useContext(Context);
  const location=useLocation();
  const path=location.pathname.split("/")[2];
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [updateMode,setUpdateMode]=useState(false);
  
  const getValue = (value) => {
    console.log(value);
    setDesc(value);
  };
  const [post,setPost]=useState({});
  useEffect(()=>{
    const getPost=async ()=>{
      const res = await axios.get("/posts/"+path);
      setPost(res.data);
      setDesc(res.data.desc);
      setTitle(res.data.title);
    }
    getPost();
  },[path]);
  // console.log(post.desc);
  const handledelete=async ()=>{
    try {
      await axios.delete(`/posts/${post._id}`,{data:{username:user.username}});
      window.location.replace("/");
    } catch (error) {

    }
  }
  const handleUpdate=async ()=>{
    try {
      await axios.put(`/posts/${post._id}`,{username:user.username,title,desc});
      window.location.reload();
    } catch (error) {

    }
  }
  let imgurl="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png";
  if(post.photo){
      const PF="http://localhost:5000/imgs/";
      imgurl=PF+post.photo
  }
  return (
    <div className='singlepost'>
      <div className="singlepostWrapper">
        {updateMode?<input type="text" value={title} className="singleposttitleInput" onChange={e=>setTitle(e.target.value)}
          autoFocus />:(
          <h1 className="singleposttitle">
            {post.title}
            { user && post.username===user.username &&
              <div className="singlepostedit">
                <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                <i className="singlePostIcon fa-solid fa-trash" onClick={handledelete}></i>
              </div>
            } 
          </h1>
        )}
        <img 
          src={imgurl}
          alt="" 
          className="singlepostImg" 
        />
        <div className="singlePostInfo">
          <span className='singlepostauthor'>Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link> 
          </span>
          <span className='singlepostdate'>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode?
        {/* <TextEditor className='writeText writeInput' initialValue={desc} getValue={getValue} /> */}
        :(
          <div className='singlepostdesc'>{post.desc? parse(post.desc):""}</div>
        )}
        {updateMode &&
          <button className="singlePostbtn" onClick={handleUpdate}>Update</button>
        }
      </div>
    </div>
  )
}


// {/* <textarea className='singlepostdescInput'value={desc} onChange={e=>setDesc(e.target.value)}/> */}

