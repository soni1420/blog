const express=require("express");
const multer=require("multer");
const path=require("path");
const dotenv =require("dotenv");
const mongoose=require("mongoose");
const authRoute=require("./routes/auth");
const usersRoute=require("./routes/users");
const postRoute=require("./routes/posts");
const categoryRoute=require("./routes/categories");

const app=express();
app.use(express.json());
dotenv.config();
app.use("/imgs",express.static(path.join(__dirname,"/imgs")))

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("conntect to mongoDB")).catch(err=>console.log(err));


const storage=  multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"imgs");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
})

const upload=multer({storage:storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
});

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);


app.listen("5000",()=>{
    console.log("Backend is running");
})