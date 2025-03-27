const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  errorResponse,
  successResponse,
} = require("../helpers/successAndError");

const EmpModel = require("../models/employeeModel");
const TaskModel = require("../models/taskModel");

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;

module.exports.addNewEmployee = async (req, res) => {
  try {

    const {name, number, password, department}=req.body;
    
    const existingUser = await EmpModel.find({ number });

    if (!existingUser) {
      return res
        .status(400)
        .json(errorResponse(400, "User is already registered"));
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    if (!hashedPassword) {
      return res
        .status(500)
        .json(errorResponse(500, "Password hashing failed"));
    }
    delete req.body.password;

    const newUser = new EmpModel({
      name,
      number,
      password: hashedPassword,
      department
    });
    await newUser.save();  

    res
      .status(201)
      .json(
        successResponse(
          201,
          `${req.body.name} has been registered successfully with _Id-${newUser._id}`,
          newUser
        )
      );
  } catch (error) {
    console.log(error.message);

    res.status(400).json(errorResponse(400, error.message));
  }
};

module.exports.empLogin = async (req, res) => {
    try {
      const { number, password } = req.body;
      const confirmPassword = password;
  
      let user = await EmpModel.findOne({ number });
      
      if (!user) {
        return res.status(401).json(errorResponse(401, "User is not registered"));
      }
     
      const matchPassword = await bcrypt.compare(confirmPassword, user.password);
  
      if (!matchPassword) {
        return res.status(401).json(errorResponse(401, "Invalid credentials"));
      }
  
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "1d" }
      );
  
      let succData = successResponse(200, "Login successful", user);
      succData.accessToken = accessToken;
  
      res.status(200).json(succData);
    } catch (error) {
      console.log("Error:", error.message);
      res.status(500).json(errorResponse(500, error.message));
    }
  };

  module.exports.getTaskforFlagDay = async (req, res) => {
   try {
        const id  = req.params.id; 
        const {flagday} = req.query;       

        const validFlagDays = ["Today", "Next Day", "Day After Tomorrow"];
        if (!validFlagDays.includes(flagday)) {
            return res.status(400).json({ message: "Invalid flagday. Use: Today, Next Day, Day After Tomorrow." });
        }

        const tasks = await TaskModel.find({ assignEmp: id, flagday });

        if (tasks.length === 0) {
            return res.status(404).json({ message: `No tasks found for ${flagday}.` });
        }

        res.status(200).json({ message: `Tasks for ${flagday} retrieved successfully`, tasks });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", details: error.message });
    }
};

  module.exports.getAllEmployee = async (req, res) => {
      try {
          const getEmployee = await EmpModel.find();
          res.status(200).json(successResponse(200, "Employee data fetched", getEmployee));
      } catch (error) {
          res.status(500).json(errorResponse(500, "Failed to fetch employee data", error.message));
      }
  };