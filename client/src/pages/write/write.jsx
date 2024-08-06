import React,{useState, useContext} from 'react'
import "./write.css"
import axios from 'axios';
import { Context } from '../../context/Context';
import TextEditor from "../../components/TextEditor";

export default function Write() {
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [tags,setTags]=useState([]);
    const [file,setFile]=useState(null);
    const {user}=useContext(Context);

    const getValue = (value) => {
        console.log(value);
        setDesc(value);
      };
    const addcat= async (newcat)=>{
        try {
            await axios.post("/categories",{name:newcat});
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const newPost={username:user.username,title,desc};
        newPost.categories=tags;
        if(file){
            const data=new FormData();
            const filename=Date.now()+"-"+file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.photo=filename;
            try {
                await axios.post("/upload",data);
            } catch (error) {
                console.log(error);
            }
        }
        for(let i=0;i<tags.length;i++){
            addcat(tags[i]);
        }
        try {
            const res=await axios.post("/posts",newPost);
            window.location.replace("/post/"+res.data._id);
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleTags=(e)=>{
        const st=e.target.value;
        let starray=st.split(",");
        for(let i=0;i<starray.length;i++){
            starray[i]=starray[i].trim();
            starray[i]=starray[i].toLowerCase();
        }
        setTags(starray);
        // console.log(starray);
    }
    return (
        <div className="write">
            {file && (
                <img 
                    className='writeImg'
                    src={URL.createObjectURL(file)}
                    alt="" 
                />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                <div className='imgicon'>
                    <label htmlFor='fileInput'>
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    </div>
                    <input type="file"  id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                    <input type="text"  placeholder='Title' className='writeInput' autoFocus={true} onChange={e=>setTitle(e.target.value)}/>
                    {/* <input type="text"  placeholder='Author' className='writeAuthor' onChange={e=>setAuthor(e.target.value)}/> */}
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder='Write here..' type="text" className='writeInput writeText' onChange={e=>setDesc(e.target.value)}></textarea>
    
                </div>
                <button className='writeSubmit' type="submit">Submit</button>
            </form>
        </div>
      )
}

// {/* <textarea placeholder='Tell your Story...' type="text" className='writeInput writeText' onChange={e=>setDesc(e.target.value)}></textarea> */}