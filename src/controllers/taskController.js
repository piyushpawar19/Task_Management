const { log } = require("console");
const TaskModel = require("../models/taskModel");

module.exports.createTask = async (req,res)=>{
    try {
        const data = req.body;
        // console.log(data);
        
        const newTask = await TaskModel(data);
        newTask.save();
        res.status(200).json({message:"Task is created successfully",newTask});
    } catch (error) {
        res.status(500).json({message:"Task is not created",details:error.message});
    }
};

module.exports.getTask = async (req,res)=>{
    try {
        const getAllTasks = await TaskModel.find();
        res.status(200).json({message:"All task is found successfully",getAllTasks});
    } catch (error) {
        res.status(500).json({message:"Task are not found",details:error.message});
    }
};

module.exports.updateTask = async (req,res)=>{
    try {
        const id = req.body.id;
        const query = req.body;
        const updatedTask = await TaskModel.findByIdAndUpdate(id,query,{
            new:true,
            runValidators:true
        })
        res.status(200).json({message:"Task is updated ",updatedTask});
    } catch (error) {
        res.status(500).json({message:"Task are not found",details:error.message});
    }
};

module.exports.deleteTask = async (req,res)=>{
    try {
        const id=req.body.id;
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        res.status(200).json({message:"Task is Deleted",deletedTask});
    } catch (error) {
        res.status(500).json({message:"Task are not found",details:error.message});
    }
}