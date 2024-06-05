

const express = require("express")
const employeeRouter = express.Router()
const {
    retrieveAllEmployees,
    retrieveOneEmployee,
    addNewEmployee,
    deleteEmployee,
    updateEmployee
} = require(`../${process.env.EMPLOYEECONTROLLERPATH}`)


employeeRouter.get("/",retrieveAllEmployees)
employeeRouter.get("/:employeeId",retrieveOneEmployee)
employeeRouter.post("/",addNewEmployee)
employeeRouter.delete("/:employeeId",deleteEmployee)
employeeRouter.patch('/:employeeId',updateEmployee)

module.exports = employeeRouter