const mongoose = require("mongoose");
const { type } = require("os");

const empSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
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