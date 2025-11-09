const express = require('express')
const app = express()
// for the get response and request //
app.get("/",(req,res)=>{
    console.log(req)
    res.status(200).json({
        message:'this is begning of fullstack mern '
    })
})


app.listen(3000,()=>{
    console.log("Nodejs prject is started")
})
