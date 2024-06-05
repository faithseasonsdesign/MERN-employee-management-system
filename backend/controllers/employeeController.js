

const employeeModel = require(`../${process.env.EMPLOYEEMODELPATH}`)

const retrieveAllEmployees = async (req,res)=>{
    try{
        const employees = await employeeModel.find({})
        if(employees.length !== 0){
            res.status(200).json({employees})
            console.log(`all employees retrieved successfuly`)
        }
        else{
            res.status(404).json({message:`failed to retrieve employees from database`})
        }
    }
    catch(error){
        res.status(500).json({message:`failed to retrieve employees`})
        console.log(`failed to retrieve employees ${error.message}`)
    }
    console.log(`method: ${req.method}`)
    console.log(`route path: ${req.path}`)
}
const addNewEmployee = async (req,res)=>{
    const {firstName,lastName,age} = req.body
    const employee = {firstName,lastName,age}
    if(firstName && lastName && age){
        res.status(200).json({message:`added new employee`,employee:employee})
    }
    else{
        res.status(400).json({message: `failed to add employee`})
    }
}
const retrieveOneEmployee = async (req,res)=>{
    res.status(200).json({message:"retrieved one employee"})
    console.log(`method: ${req.method}`)
    console.log(`route path: ${req.path}`)
    console.log(`employee id: ${req.params.employeeId}`)
}
const deleteEmployee = async (req,res)=>{
    res.status(200).json({message:`deleted employee`})
    console.log(`delete employee with id : ${req.params.employeeId}`)
}

const updateEmployee = async (req,res)=>{
    res.status(200).json({message:`updated employee with id : ${req.params.employeeId}`})
    console.log(`updated employee with id: ${req.params.employeeId}`)
}

module.exports = {
    retrieveAllEmployees,
    retrieveOneEmployee,
    addNewEmployee,
    deleteEmployee,
    updateEmployee,
}
