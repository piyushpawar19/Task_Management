const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`Connected to Database, DB:`);
  })
  .catch((e) => {
    console.log("Connection with DB failed");
    console.log(e);
  });

module.exports = connection;
