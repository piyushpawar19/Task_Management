const mongoose = require("mongoose");


const empSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true
    },
    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
    },
});

const EmpModel = new mongoose.model("employee",empSchema);

module.exports = EmpModel ;