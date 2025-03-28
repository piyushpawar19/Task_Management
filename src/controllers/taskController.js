const { 
    errorResponse,
    successResponse,
  } = require("../helpers/successAndError");
const TaskModel = require("../models/taskModel");

module.exports.createTask = async (req, res) => {
    try {
        const { title, description, assignEmp, flagday } = req.body;

        const formattedFlagday = flagday.trim();

        const taskCount = await TaskModel.countDocuments({ assignEmp, flagday: formattedFlagday });

        if (taskCount >= 6) {
            return res.status(400).json(errorResponse(400, `Only 6 tasks allowed for ${formattedFlagday} for this employee`));
        }

        // console.log("Flagday received:", formattedFlagday);

        if (formattedFlagday === "Next Day") {
            const todayTaskCount = await TaskModel.countDocuments({ assignEmp, flagday: "Today" });
            // console.log(`Today task count for ${assignEmp}:`, todayTaskCount);

            if (todayTaskCount < 6) {
                return res.status(400).json(errorResponse(400, "Complete 6 tasks for Today before scheduling tasks for Next Day"));
            }
        }

        if (formattedFlagday === "Day After Tomorrow") {
            const todayTaskCount = await TaskModel.countDocuments({ assignEmp, flagday: "Today" });
            const nextDayTaskCount = await TaskModel.countDocuments({ assignEmp, flagday: "Next Day" });

            // console.log(`Today task count for ${assignEmp}:`, todayTaskCount);
            // console.log(`Next Day task count for ${assignEmp}:`, nextDayTaskCount);

            if (todayTaskCount < 6) {
                return res.status(400).json(errorResponse(400, "Complete 6 tasks for Today before scheduling tasks for Day After Tomorrow"));
            }

            if (nextDayTaskCount < 6) {
                return res.status(400).json(errorResponse(400, "Complete 6 tasks for Next Day before scheduling tasks for Day After Tomorrow"));
            }
        }

        const newTask = new TaskModel({ title, description, assignEmp, flagday: formattedFlagday });
        await newTask.save();

        res.status(201).json(successResponse(201, "Task created successfully", newTask));
    } catch (error) {
        console.error("Error in createTask:", error);
        res.status(500).json(errorResponse(500, "Task creation failed", error.message));
    }
};





module.exports.getTask = async (req, res) => {
    try {
        const getAllTasks = await TaskModel.find();
        res.status(200).json(successResponse(200, "All tasks retrieved successfully", getAllTasks));
    } catch (error) {
        res.status(500).json(errorResponse(500, "Tasks not found", error.message));
    }
};

module.exports.updateTask = async (req, res) => {
    try {
        // const { id, ...updateData } = req.body;
        const id = req.params.id;
        const updateData = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedTask) {
            return res.status(404).json(errorResponse(404, "Task not found"));
        }

        res.status(200).json(successResponse(200, "Task updated successfully", updatedTask));
    } catch (error) {
        res.status(500).json(errorResponse(500, "Task update failed", error.message));
    }
};

module.exports.deleteTask = async (req, res) => {
    try {
        const id = req.param.id;

        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json(errorResponse(404, "Task not found"));
        }

        res.status(200).json(successResponse(200, "Task deleted successfully", deletedTask));
    } catch (error) {
        res.status(500).json(errorResponse(500, "Task deletion failed", error.message));
    }
};

