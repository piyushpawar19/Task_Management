const mongoose = require("mongoose");
const TaskModel = require("../models/taskModel");

const updateFlagday = async () => {
    try {
        console.log("Running daily Flagday update...");

        await TaskModel.updateMany({ flagday: "Next Day" }, { flagday: "Today" });

        await TaskModel.updateMany({ flagday: "Day After Tomorrow" }, { flagday: "Next Day" });

        console.log("Flagday updated successfully.");
    } catch (error) {
        console.error("Error updating Flagday:", error.message);
    }
};


setInterval(updateFlagday, 24 * 60 * 60 * 1000);

module.exports = updateFlagday;
