const cron = require("node-cron");
const TaskModel = require("../models/taskModel");


cron.schedule("0 0 * * *", async () => {
    try {
        console.log(" Running daily Flagday update...");


        await TaskModel.updateMany({ flagday: "Next Day" }, { flagday: "Today" });


        await TaskModel.updateMany({ flagday: "Day After Tomorrow" }, { flagday: "Next Day" });

        console.log("Flagday updated successfully.");
    } catch (error) {
        console.error(" Error updating Flagday:", error.message);
    }
});
