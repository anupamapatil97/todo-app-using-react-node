const express= require("express")
const cors= require("cors")
const verifyToken = require("../middleware/auth")

const router= express.Router()
const {createTask, getAllTask, updateTask, deleteTask} = require("../controller/task.controller")
router.post("/createTask",[verifyToken],createTask )
router.get("/getTaskList",[verifyToken],getAllTask )
router.put("/updateTask/:id",[verifyToken],updateTask )
router.delete("/deleteTask/:id",[verifyToken],deleteTask )


module.exports= router