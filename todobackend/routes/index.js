const express= require("express")

const TaskRouter= require("../routes/task.routes")

const router= express.Router()

router.use("/task", TaskRouter)

module.exports=router