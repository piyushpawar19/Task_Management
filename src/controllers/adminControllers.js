const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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

    console.log(req.body);
    const {name, number, password, department}=req.body;
    
    const existingUser = await EmpModel.findOne({ number });

    if (existingUser) {
      return res
        .status(400)
        .json(errorResponse(400, "User is already registered"));
    }
    const hashedPassword = await bcrypt.hash(number, SALT_ROUNDS);
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
// module.exports.empLogin = async (req, res) => {
//   try {
//     const { number, password } = req.body;

//     let user = await EmpModel.findOne({ number });
//     // console.log(user);
//     if(!user){
//         return res.status(401).json(errorResponse(401, "User is not registred"));
//     }
    
//     // console.log(user.password);
//     // console.log(password);
     
//     const matchPassword = (await bcrypt.compare(password, user.password))
//     console.log(matchPassword);
    
//     if(!matchPassword){
//         return res.status(401).json(errorResponse(401, "Invalid credentials"));

//     }
      

//     const accessToken = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
//       expiresIn: ACCESS_TOKEN_EXPIRATION,
//     });

//     let succData = successResponse(200, "Login successful", user);
//     succData.accessToken = accessToken;

//     res.status(200).json(succData);
//   } catch (error) {
//     console.log(error.message);

//     res.status(500).json(errorResponse(500, error.message));
//   }
// };

module.exports.empLogin = async (req, res) => {
    try {
      const { number, password } = req.body;
  
      let user = await EmpModel.findOne({ number });
      
      if (!user) {
        return res.status(401).json(errorResponse(401, "User is not registered"));
      }
  

      console.log("🔹 Stored Hashed Password in DB:", user.password);
      console.log("🔹 Entered Password from User:", password);
  
     
      const matchPassword = await bcrypt.compare(password, user.password);
      console.log("🔹 Password Match Result:", matchPassword);
  
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

module.exports.getUserTask = async (req, res) => {
    try {
        const task = await TaskModel.find({
            assignEmp: req.params.id,
          })

          if (!task) {
            return res
              .status(404)
              .json(errorResponse(404, "Task was not found"));
          }
          res.json(successResponse(200, "Task found", task));
    } catch (error) {
      console.log("Error:", error.message);
      res.status(500).json(errorResponse(500, error.message));
    }
    
}