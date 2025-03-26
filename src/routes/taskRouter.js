const express = require("express");

const { createTask , getTask , updateTask , deleteTask } =require ("../controllers/taskController");

const TaskRouter= express.Router();

TaskRouter.post("/createTask",createTask);
TaskRouter.get("/getTask",getTask);
TaskRouter.put("/updateTask/:id",updateTask);
TaskRouter.delete("/deleteTask/:id",deleteTask);

module.exports = TaskRouter ;
