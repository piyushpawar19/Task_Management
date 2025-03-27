const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

const connection = require("./src/config/db");
const TaskRouter = require("./src/routes/taskRouter");
const EmpRouter = require ("./src/routes/employeeRouter");
const AdminRouter = require ("./src/routes/adminRouter");

// require("./src/helpers/taskScheduler");
const updateFlagday = require("./src/helpers/taskScheduler");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
// app.use(morgan());

app.get("/", async (req, res) => {
    try {
      res.status(200).json({
        success: "Hello from the server",
        message: "Server is running perfectly fine",
      });
    } catch (error) {
      res
        .status(500)
        .json(
          errorResponse(500, "Internal server error at home route", error.message)
        );
    }
  });

app.use("/api/task",TaskRouter);
app.use("/api/employee",EmpRouter);
app.use("/api/admin",AdminRouter);

  app.listen(PORT, async () => {
    try {
      await connection; 
      console.log({ message: `Server is listening on port ${PORT}` });
    } catch (error) {
      console.log(error.message);
    }
  });