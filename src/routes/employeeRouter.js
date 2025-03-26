const express = require("express");
const { getEmployee } = require("../controllers/employeeController");

const EmpRouter = express.Router();

EmpRouter.get("/getEmp",getEmployee);

module.exports = EmpRouter ;