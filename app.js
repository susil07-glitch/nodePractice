require('dotenv').config()

const express = require('express')
const connectToDatabase=require('./Databse/')
const app = express()

app.use(express.json())

const {multer,storage}=require('./middleware/multerConfigure')

const upload= multer({ storage : storage})

const Blog= require('./model/userModel')
app.use(express.static('./storage'))

connectToDatabase()

// Home page api //

app.get("/",(req,res)=>{
    console.log(req)
    res.status(200).json({
        message:'this is begning of fullstack mern '
    })
})


// about page api//

app.get("/about",(req,res)=>{
    res.status(200).json({
        message:'this is about page'
    })
})


// to update blogs  //


app.post("/blog",upload.single("image"), async (req,res)=>{
    const{title,subtitle,description}=req.body
    const filename =req.file.filename
    
    if(!title ||!subtitle || !description){ // for validation purpose // 
        res.status(400).json({
            "message":"please provide valid imformation "
        })
    }else {
        await Blog.create({
        title: title,
        subtitle: subtitle,
        description:description,
        image: filename 
       
    })

    }
   
   

         res.status(200).json({
        message:"this api is hitted "
    })

})


// to featch all data from the database // 


app.get("/blog" ,async (req,res)=>{
   const blogs= await Blog.find()

   res.status(200).json({
    message :"Blogs featch successfully " ,
    data: blogs
   })

 
})




// to operate in the 3000 port number //

app.listen(process.env.PORT,()=>{
    console.log("Nodejs prject is started")
})

