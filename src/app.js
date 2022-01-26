require("dotenv").config();
const express = require("express");
const { userRouter } = require("./routes/users.routes");
const connect = require("./db/connect");
const app = express();
// middellwares
app.use(express.json());
// for forms only
// app.use(express.urlencoded({ extended: false }));

app.use(userRouter);
const start = async () => {
  try {
    //   first method
    // await connect("mongodb://localhost:27017/ourproject");
    // second method
    await connect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log("lisetning...");
    });
  } catch (error) {
    console.log("Error: 18", error.message);
  }
};

start();
