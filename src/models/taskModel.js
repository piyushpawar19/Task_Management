const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignEmp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed"],
        default: "Not Started",
        required: true
    },
    flagday: {
        type: String,
        enum: ["Today", "Next Day", "Day After Tomorrow"],
        required: true
    }
});

const TaskModel = mongoose.model("task", taskSchema);
module.exports = TaskModel;
