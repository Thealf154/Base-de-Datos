//Load dependencies
const morgan = require("morgan");
const express = require("express");
const app = express();
//Routes
const students = require("./routes/students");
const user = require("./routes/user");
const subjects = require('./routes/subjects');
//Middleware
const notFound = require("./middleware/notFound");
const index = require("./middleware/index");
const cors = require("./middleware/cors");

app.use(cors);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);
app.use("/user", user);
app.use("/students", students);
app.use("/subjects", subjects);

app.use(notFound);

//Load a local server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
