const { 
    errorResponse,
    successResponse,
  } = require("../helpers/successAndError");
  
  const EmpModel = require("../models/employeeModel");
  const TaskModel = require("../models/taskModel");

  const bcrypt = require("bcrypt")

  const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
  
  module.exports.getEmployee = async (req, res) => {
      try {
          const id = req.userId;
          const getEmployee = await EmpModel.findById(id);
          res.status(200).json(successResponse(200, "Employee data fetched", getEmployee));
      } catch (error) {
          res.status(500).json(errorResponse(500, "Failed to fetch employee data", error.message));
      }
  };
  
  module.exports.updateEmployee = async (req, res) => {
      try {
          const id = req.body.id;
          const query = req.body;
          const updatedEmployee = await EmpModel.findByIdAndUpdate(id, query, {
              new: true,
              runValidators: true
          });
  
          res.status(200).json(successResponse(200, "Employee updated successfully", updatedEmployee));
      } catch (error) {
          res.status(500).json(errorResponse(500, "Failed to update employee", error.message));
      }
  };
  
  module.exports.deleteEmployee = async (req, res) => {
      try {
          const id = req.body.id;
          const deletedEmployee = await EmpModel.findByIdAndDelete(id);
  
          res.status(200).json(successResponse(200, "Employee deleted successfully", deletedEmployee));
      } catch (error) {
          res.status(500).json(errorResponse(500, "Failed to delete employee", error.message));
      }
  };
  
  module.exports.getTaskforFlagDay = async (req, res) => {
      try {
          const { flagday } = req.query;
  
          const validFlagDays = ["Today", "Next Day", "Day After Tomorrow"];
          if (!validFlagDays.includes(flagday)) {
              return res.status(400).json(errorResponse(400, "Invalid flagday. Use: Today, Next Day, Day After Tomorrow."));
          }
  
          const tasks = await TaskModel.find({ assignEmp: req.userId, flagday });
  
          if (tasks.length === 0) {
              return res.status(404).json(errorResponse(404, `No tasks found for ${flagday}.`));
          }
  
          res.status(200).json(successResponse(200, `Tasks for ${flagday} retrieved successfully`, tasks));
      } catch (error) {
          res.status(500).json(errorResponse(500, "Error retrieving tasks", error.message));
      }
  };

  module.exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const employee = await EmpModel.findById(req.userId);
        if (!employee) {
            return res.status(404).json(errorResponse(404, "Employee not found"));
        }

        const isMatch = await bcrypt.compare(oldPassword, employee.password);
        if (!isMatch) {
            return res.status(401).json(errorResponse(401, "Old password is incorrect"));
        }

        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

        employee.password = hashedPassword;
        await employee.save();

        res.status(200).json(successResponse(200, "Password changed successfully"));
    } catch (error) {
        res.status(500).json(errorResponse(500, "Password change failed", error.message));
    }
};
  