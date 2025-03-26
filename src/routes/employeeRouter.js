const express = require("express");
const { getEmployee ,updateEmployee, deleteEmployee} = require("../controllers/employeeController");
const {authenticate} = require("../middlewares/authenticate")

const { checkRole } = require("../middlewares/authorization");

const EmpRouter = express.Router();

EmpRouter.get("/getEmp",authenticate, checkRole("admin"),getEmployee);
EmpRouter.put("/updateEmp",authenticate, updateEmployee);
EmpRouter.delete("/deleteEmp",authenticate, checkRole("admin"),deleteEmployee);

module.exports = EmpRouter ;