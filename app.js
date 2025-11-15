require('dotenv').config()

const express = require('express')
const connectToDatabase=require('./Databse/')
const app = express()

connectToDatabase()


app.get("/",(req,res)=>{
    console.log(req)
    res.status(200).json({
        message:'this is begning of fullstack mern '
    })
})

app.get("/about",(req,res)=>{
    res.status(200).json({
        message:'this is about page'
    })
})


app.listen(process.env.PORT,()=>{
    console.log("Nodejs prject is started")
})

