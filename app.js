require('dotenv').config()

const express = require('express')
const connectToDatabase=require('./Databse/')
const app = express()
app.use(express.json())

const {multer,storage}=require('./middleware/multerConfigure')

const upload= multer({ storage : storage})

const Blog= require('./model/userModel')

connectToDatabase()


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
// Blog API //
app.post ("/blog",upload.single('image'),async  (req,res)=>{
    const{title,subtitle,description,image}=req.body
    if(!title ||!subtitle || !description ||!image){
        res.status(400).json({
            "message":"please provide valid imformation "
        })
    }
   await Blog.create({
        title: title,
        subtitle: subtitle,
        description:description,
        image:image
    })

    res.status(200).json({
        message:"this api is hitted "
    })
})





app.listen(process.env.PORT,()=>{
    console.log("Nodejs prject is started")
})

