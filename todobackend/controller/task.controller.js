const Task = require("../modal/task.modal");
const { response } = require("./helper");

const getAllTask = async (req, res) => {
  try {
    const result = await Task.find();

    if (result && result.length > 0) {
      return res.status(200).json({
        ...response,
        data: result,
        message: "Task Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        ...response,
        data: [],
        message: "Task Fetched Successfully",
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ ...response, global_error: "Problem while fetching task list" });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
    });

    const newTask = await task.save();

    if (newTask) {
      return res.status(200).json({
        ...response,
        data: newTask,
        message: "Task Created Successfully",
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ ...response, global_error: "Problem while creating task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    let request = {
      title: req.body.title,
      status: req.body.status,
      _id: id,
    };
    const taskToUpdate = await Task.findOneAndUpdate(
      { _id: id },
      { ...request },
      { new: true }
    );
    if (taskToUpdate) {
      return res.status(200).json({
        ...response,
        data: taskToUpdate,
        message: "Task Updated Successfully",
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ ...response, global_error: "Problem while creating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    let id = req.params.id;

    const taskToDelete = await Task.findOneAndDelete({ _id: id });
    if (taskToDelete) {
      return res.status(200).json({
        ...response,
        data: taskToDelete,
        message: "Task Deleted Successfully",
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ ...response, global_error: "Problem while creating task" });
  }
};
module.exports = { getAllTask, createTask, updateTask, deleteTask };
