const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("dev"));

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

  app.listen(PORT, async () => {
    try {
      await connection; 
      console.log({ message: `Server is listening on port ${PORT}` });
    } catch (error) {
      console.log(error.message);
    }
  });