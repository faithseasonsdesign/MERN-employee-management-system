

const mongoose = require("mongoose")

const EmployeeSchema = mongoose.Schema

const EmployeeModel = EmployeeSchema({
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

module.exports = mongoose.model("Employee",EmployeeModel)