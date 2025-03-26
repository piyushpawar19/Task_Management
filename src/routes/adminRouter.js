const express = require("express");
const { addNewEmployee,empLogin,adminLogin } = require("../controllers/adminControllers");

const AdminRouter = express.Router();

AdminRouter.post("/createEmployee",addNewEmployee);
AdminRouter.post("/adminlogin",adminLogin);
AdminRouter.post("/employeelogin",empLogin);


module.exports.AdminRouter;