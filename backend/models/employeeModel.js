

//model files will be passes to controllers to perform operations
//schemas will be defined and stored in models 
//models will be initialized and exported as modules for controllerFunctions


const mongoose = require("mongoose")
const EmployeeSchema = mongoose.Schema
const employeeModel = EmployeeSchema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Employee",employeeModel)