const express = require("express");
const { getEmployee ,updateEmployee, deleteEmployee,getTaskforFlagDay,changePassword} = require("../controllers/employeeController");
const {authenticate} = require("../middlewares/authenticate")

const { checkRole } = require("../middlewares/authorization");

const EmpRouter = express.Router();

EmpRouter.get("/getEmp",authenticate,getEmployee);
EmpRouter.put("/updateEmp",authenticate, updateEmployee);
EmpRouter.delete("/deleteEmp",authenticate, checkRole("admin"),deleteEmployee);
EmpRouter.get("/flagdayTask",authenticate,getTaskforFlagDay);
EmpRouter.put("/change-password", authenticate, changePassword);

module.exports = EmpRouter ;