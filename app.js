require('dotenv').config()

const express = require('express')
const connectToDatabase=require('./Databse/')
const app = express()

app.use(express.json())

const {multer,storage}=require('./middleware/multerConfigure')

const upload= multer({ storage : storage})

const Blog= require('./model/userModel')
app.use(express.static('./storage'))
const fs=require('fs')

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


// to post data to the server  //


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
 // to edit by diffrent id //


app.get("/blog/:id", async(req,res)=>{
    const id =req.params.id // to find the blog by id 
      const blog = await Blog.findById(id) // show data as a object 

    if(!blog){

        res.status(404).json({
            message :" no data found "

        })


    }else{
        res.status(200).json({

            message :"data fetched sucessfully ",
             data :blog ,

             

        })
       
    }

})

// to delete the data from database //
app.delete("/blog/:id",async (req,res)=>{
    const id =req.params.id
    const blog=await Blog.findById(id)

    const imageName = blog.image
   

    fs.unlink(`storage/${imageName}`,(err)=>{
        if(err){
            console.log("err")

        }else{
            console.log("blog deleted sucessfully")
        }
    })

    await Blog.findByIdAndDelete(id)

    res.status(200).json({
        message:"data deleted successfully "
    })

   
   

})


app.patch("/blog/:id",upload.single('image'),async(req,res)=>{

    const id =req.params.id 
    const {title,subtitle,description}=req.body
    let imageName;

    if(req.file){

        imageName=req.file.fileName
        const blog=await Blog.findById(id)

        const imageName = blog.image
   

    fs.unlink(`storage/${imageName}`,(err)=>{
        if(err){
            console.log("failed to update")

        }else{
            console.log("blog deleted sucessfully")
        }
    })


 }

    const blog= await Blog.findByIdAndUpdate(id,{
        title : title,
        subtitle : subtitle,
        description : description,
        image:imageName
    })
    
    res.status(200).json({
        message:"data update successfully ",
        data:blog
    })




})




// to operate in the 3000 port number //

app.listen(process.env.PORT,()=>{
    console.log("Nodejs prject is started")
})

