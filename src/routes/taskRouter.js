const express = require("express");

const { createTask , getTask , updateTask , deleteTask } =require ("../controllers/taskController");
const {authenticate} = require("../middlewares/authenticate")

const TaskRouter= express.Router();

TaskRouter.post("/createTask",authenticate,createTask);
TaskRouter.get("/getTask",authenticate,getTask);
TaskRouter.put("/updateTask/:id",authenticate,updateTask);
TaskRouter.delete("/deleteTask/:id",authenticate,deleteTask);

module.exports = TaskRouter ;
