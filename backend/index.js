

require("dotenv").config()

const express = require("express")
const app = express()
const PORT = process.env.PORT | 3000


//requires
const mongoose = require("mongoose")
const employeesRouter = require(`./${process.env.EMPLOYEEROUTES}`)
//middlewares
app.use(express.json())
app.use(`/${process.env.EMPLOYEEROUTEHANDLER}`,employeesRouter)
app.use((err,req,res,next)=>{
    console.error(err.stack)
    console.status(500).send("something broke")
    next()
})

//connect to the database
const CONNSTRING = process.env.CONNSTRING
mongoose.connect(CONNSTRING,{})
.then(()=>{
    startServer(PORT)
})
.catch((err)=>{
    console.log(`failed to connect to the database ${err}`)
})

const startServer = (port)=>{
    app.listen(port,()=>{
        console.log(`connected to the database and running application on localhost:/${port}`)
    })
    .on("error",(err)=>{
        if(err.code === 'EADDRINUSE'){
            console.warn(`Port ${port} is in use trying another port`)
            startServer(port+1) 
        }else{
            console.error(`Failed to start server: ${err.message}`)
        }
    })
}
