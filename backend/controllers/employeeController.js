

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
    if(!firstName || !lastName || !age){
        res.json({message:`please provide firstname,lastname and age`})
        console.log(`please provide the firstname,lastname and age`)
    }   
    else{
        const employeeInfo = {firstName,lastName,age}
        try{
            const employeeExist = await employeeModel.findOne({firstName,lastName})
            if(employeeExist){
                res.json({message:`employee with firstname ${firstName} and lastname ${lastName} already exist`})
            }
            else{
                try{
                    const newEmployee = await employeeModel.create(employeeInfo)
                    if(newEmployee){
                        res.json({message:`added employee successfuly`,firstName:newEmployee.firstName,lastName:newEmployee.lastName})
                    }
                    else{
                        res.json({message:`failed to add a new employee`})
                    }
                }
                catch(error){
                    res.json({errorName:`error name : ${error.name}`,errorCode:`error code : ${error.code}`})
                }
            }
        }
        catch(error){
            res.json({errorName:`error name : ${error.name}`,errorCode:`error code ${error.code}`})
        }
    }
}

const retrieveOneEmployee = async (req,res)=>{
    const employeeInfo = req.params
    try{
        const employeeExist = await employeeModel.findOne(employeeInfo)
        if(employeeExist){
            res.json({message:`employee exist `,firstName:employeeExist.firstName,lastName:employeeExist.lastName})
        }
        else{
            res.json({message:`employee does not exist`})
        }
    }
    catch(error){
        if(error.name === "ValidationError"){
            res.json({message:`Validation Error ${error.message}`})
        }else{
            res.json({message:`Database Error ${error}`})
        }
    }
}
const deleteEmployee = async (req,res)=>{
    const params = req.params
    const employeeName = params.employeeId
    if(employeeName !== ""){
        try{
            const deletedEmployee = await employeeModel.findOneAndDelete(employeeName)
            if(deletedEmployee){
                res.json({message:`deleted employee successfuly`})
            }
            else{
                res.json({message:`failed to delete employee`})
            }
        }
        catch(error){
            res.json({message:`database error ${error}`})
        }
    }
    else{
        res.json({message:`please enter the name of the person you want to delete`})
    }
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
