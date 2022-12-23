const express= require("express")
const cors= require('cors')

const TaskRouter= require("../routes/task.routes")
const UserRoutes= require("../routes/user.routes")

const router= express.Router()

router.use("/task",cors(), TaskRouter)
router.use("/user",cors(), UserRoutes)

module.exports=router