const express = require("express");
const mongoose = require("mongoose");
const Task = require("./modal/task.modal");
const indexRoute = require("./routes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors= require('cors')

dotenv.config();

const app = express();

app.use(cors({
    origin: '*'
}));


app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

mongoose
  .connect("mongodb://localhost:27017/task-demo")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/", indexRoute);



const Port = process.env.POST || 3000;

app.listen(Port, () => {
  console.log("server is running on port 3008");
});
