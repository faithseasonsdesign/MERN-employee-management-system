
const express = require("express")
const employeesRouter = express.Router()

const EmployeeModel = require("../models/EmployeeModel")

//retrieve all employees
employeesRouter.get('/',(req,res)=>{
    res.json({message:"retrieving list of all employees"})
})

//retrieve one specific employee
employeesRouter.get("/:id",(req,res)=>{
    res.json({message:"retreiving one specific employee"})
})

//add new employee to the database is async perfomance
employeesRouter.post("/", async (req,res)=>{
    const {firstName,lastName,age} = req.body
    try{
        const employee = await EmployeeModel.create({firstName,lastName,age})
        res.json({employee})
    }
    catch(err){

    }
})

//delete specific employee
employeesRouter.delete("/:id",(req,res)=>{
    res.json({message:"deleting one specific employee"})
})

//update one speficic employee
employeesRouter.patch("/:id",(req,res)=>{
    res.json({message:"deleting one specific employee"})
})


module.exports = employeesRouter

