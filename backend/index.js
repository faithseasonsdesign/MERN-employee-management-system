

require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000


//imports
const employeeRouter = require(`./routes/employeeRouter`)
const mongoose = require("mongoose")
//middlewares
app.use(express.json())
app.use(`/api/employees`,employeeRouter)
app.use((err,req,res,next)=>{
    console.error(err.stack)
    console.log(`oops something went wrong ${err.message}`)
    next()
})

//connect to the database
mongoose.connect(process.env.CONNSTRING,{})
.then(()=>{
    startServer(PORT)
})
.catch((error)=>{
    console.error(`failed to connect to the database ${error.message}`)
})

//start the server
const startServer = (port)=>{
    app.listen(PORT,()=>{
        console.log(`connected to database and application running on localhost:/${port}`)
    })
    .on("error",(error)=>{
        if(error.code === "EADDRINUSE"){
            console.warn(`${port} is currently in use trying another port...`)
            startServer(port+1)
        }
        else{
            console.error(`failed to start server ${error.message}`)
        }
    })
}



