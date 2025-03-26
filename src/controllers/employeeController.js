const EmpModel = require("../models/employeeModel");
const TaskModel = require("../models/taskModel");

module.exports.getEmployee = async (req,res) =>{
    try {
        const getEmployee = await EmpModel.find();
        res.status(200).json({message:"Employee data is fetched ",getEmployee});
    } catch (error) {
        res.statue(500).json({message:"Employee is not get",details:error.message});
    }
};

module.exports.updateEmployee = async (req,res)=>{
    try {
        const id = req.body.id;
        const query = req.body;
        const updatedEmployee = await EmpModel.findByIdAndUpdate(id,query,{
            new:true,
            runValidators:true
        })
        res.status(200).json({message:"Employee is updated successfully",updatedEmployee});
    } catch (error) {
        
        res.status(500).json({message:"Employee is not updated ",details:error.message});
    }
};

module.exports.deleteEmployee = async(req,res)=>{
    try {
        const id=req.body.id;
        const deletedEmployee = await EmpModel.findByIdAndDelete(id);
        res.status(200).json({message:"Employee is deleted",deletedEmployee});
    } catch (error) {
        res.status(500).json({message:"Employee is not deleted",details:error.message});
    }
};

module.exports.getTaskforFlagDay = async (req, res) => {
    try {
        const { flagday } = req.query;     
 
        const validFlagDays = ["Today", "Next Day", "Day After Tomorrow"];
        if (!validFlagDays.includes(flagday)) {
            return res.status(400).json({ message: "Invalid flagday. Use: Today, Next Day, Day After Tomorrow." });
        }   
                
        const tasks = await TaskModel.find({ assignEmp: req.userId ,flagday });

        if (tasks.length === 0) {
            return res.status(404).json({ message: `No tasks found for ${flagday}.` });
        }

        res.status(200).json({ message: `Tasks for ${flagday} retrieved successfully`, tasks });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", details: error.message });
    }
};
