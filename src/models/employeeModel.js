const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
});

const EmpModel = new mongoose.model("employee",empSchema);

module.exports = EmpModel ;