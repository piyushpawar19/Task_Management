const express = require("express");
const { addNewEmployee,empLogin } = require("../controllers/adminControllers");

const {authenticate} = require("../middlewares/authenticate")
// const checkRole = require("../middlewares/authorization")
const { checkRole } = require("../middlewares/authorization");

const AdminRouter = express.Router();

AdminRouter.post("/createEmployee",authenticate, checkRole("admin"), addNewEmployee);

AdminRouter.post("/login", empLogin);


module.exports=AdminRouter;