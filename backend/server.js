
require("dotenv").config()

const express = require("express")
const app = express()
const PORT = process.env.PORT | 3000


//requires
const mongoose = require("mongoose")


//set up middlewares
app.use(express.json())
app.use((err,req,res,next)=>{
    console.error(err.stack)
    console.status(500).send("something broke down")
    next()
})

//startServer, listen to it and handle errors
const startServer = (PORT)=>{
    app.listen(PORT,()=>{
        console.log(`application running on localhost:/${PORT}`)
    })
    .on("error",(err)=>{
        if(err.code === 'EADDRINUSE'){
            console.warn(`PORT ${PORT} is in use trying another port`)
            startServer(PORT+1)
        }
        else{
            console.error(`failed to start the server ${err.message}`)
        }
    })
}