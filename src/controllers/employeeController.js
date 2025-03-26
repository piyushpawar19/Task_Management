const EmpModel = require("../models/employeeModel");

module.exports.getEmployee = async (req,res) =>{
    try {
        const getEmployee = await EmpModel.find();
        res.status(200).json({message:"Employee data is fetched ",getEmployee});
    } catch (error) {
        res.statue(500).json({message:"Employee is not get",details:error.message});
    }
};
