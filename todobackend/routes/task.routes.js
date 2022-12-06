const express= require("express")
const cors= require("cors")

const router= express.Router()
const {createTask, getAllTask, updateTask, deleteTask} = require("../controller/task.controller")
router.post("/createTask",cors(),createTask )
router.get("/getTaskList",cors(),getAllTask )
router.put("/updateTask/:id",cors(),updateTask )
router.delete("/deleteTask/:id",cors(),deleteTask )




module.exports= router