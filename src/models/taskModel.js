const mongoose = require ("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    assignEmp:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        default:Date.now,
        required:true
    },
    status:{
        type:String,
        enum:["Not Started","In Progress","Completed"],
        default:"Not Started",
        required:true
    }
});
const TaskModel = new mongoose.model("task",taskSchema);

module.exports = TaskModel;
