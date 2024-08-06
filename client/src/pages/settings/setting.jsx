import React, { useState } from 'react'
import { useContext } from 'react'
import "./setting.css"
import {Context} from "../../context/Context";
import axios from "axios";

export default function Setting() {
    const {user,dispatch}=useContext(Context);
    const [file,setFile]=useState(null);
    const [username,setUsername]=useState(user.username);
    const [email,setEmail]=useState(user.email);
    const [password,setPassword]=useState("");
    const [success,setSuccess]=useState(false);
    
    const PF="http://localhost:5000/imgs/";
    // console.log(user);
    const handleSubmit= async (e)=>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"});
        const newupdatedUser={userId:user._id,username,email,password};
        if(file){
            const data=new FormData();
            const filename=Date.now()+"-"+file.name;
            data.append("name",filename);
            data.append("file",file);
            newupdatedUser.profilePic=filename;
            try {
                await axios.post("/upload",data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res=await axios.put("/users/"+user._id,newupdatedUser);
            console.log(res.data);
            setSuccess(true);
            dispatch({type:"UPDATE_SUCCESS",payload:res.data});
            window.location.reload();
        } catch (error) {
            console.log(error);
            dispatch({type:"UPDATE_FAILURE"});
        }
    }
    // console.log(user.profilePic);
  return (
    <div className='settings'>
        <div className="settingWrapper">
            <div className="settingTitle">
                <span className="settingUpdateTitle">
                    Update Your Account
                </span>
                <span className="settingDeleteTitle">
                    Delete Account
                </span>
            </div>
            <form className='settingForm' onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img
                        src={file? URL.createObjectURL(file):PF+user.profilePic}
                        alt="" 
                    />
                    <label htmlFor='fileInput'>
                        <i className="settingsPPIcon fa-regular fa-user"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                </div>
                <label>Username</label>
                <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" onChange={e=>setPassword(e.target.value)}/>
                <button className="settingSubmit" type='submit'>Update</button>
                {success && <span style={{color:"green",textAlign:"center"}}>Profile is updated</span>}
            </form>
        </div>
    </div>
  )
}
