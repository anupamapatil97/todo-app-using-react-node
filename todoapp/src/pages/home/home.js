import React, { useState, useEffect } from "react";
import Header from "../../component/header/header";
import TaskList from "../../component/taskList/taskList";
import AlertMessage from "../../component/AlertMessage/alertMessage";
import ConfirmModal from "./../../component/Modal/ConfirmModal/index";
import { useNavigate } from "react-router-dom";
import {
  editTask,
  getAllTaskList,
  deleteTask,
  addTask,
} from "../../services/taskServices";

const Home = () => {
  const navigate = useNavigate();
  const [modalDetails, setModalDetails] = useState({
    show: false,
    message: "",
    variant: "success",
    heading: "",
    taskOperation: "",
  });
  const [selectedTask, setSelectedTask] = useState({});

  const [taskList, setTaskList] = useState([]);

  const [formValues, setFormValues] = useState({
    title: "",
  });
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
  });
  const [show, setShow] = useState(false);

  const getTaskList = async () => {
    try {
      const response = await getAllTaskList();

      if (response.status === 200) {
        setTaskList(response.data.data);
      } else {
      }
    } catch (error) {
      setShowAlert({
        show: true,
        message: error.response.data.global_error,
        colorName: "red",
      });
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const onCompleteTask = async () => {
    const response = await editTask(selectedTask);
    if (response.status === 200) {
      setShowAlert({
        show: true,
        message: response.data.message,
        colorName: "green",
      });
      setModalDetails({
        show: false,
        message: "",
        variant: "success",
        heading: "",
        taskOperation: "",
      });
      getTaskList();
    }
  };

  const onDeleteTask = async () => {
    const response = await deleteTask(selectedTask);
    if (response.status === 200) {
      getTaskList();
      setShowAlert({
        show: true,
        message: response.data.message,
        colorName: "green",
      });
      setModalDetails({
        show: false,
        message: "",
        variant: "success",
        heading: "",
        taskOperation: "",
      });
    }
  };

  const onConfirmOperation = () => {
    if (modalDetails.taskOperation) {
      if (modalDetails.taskOperation === "D") {
        onDeleteTask();
        return;
      }
      if (modalDetails.taskOperation === "C") {
        onCompleteTask();
        return;
      }
    }
  };

  const createTask = async () => {
    const response = await addTask(formValues);
    if (response.status === 200) {
      setShow(false);
      setFormValues({ title: "" });
      getTaskList();
    }
  };
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="home-conatiner">
      <AlertMessage showAlert={showAlert} setShowAlert={setShowAlert} />
      <Header
        onCompleteTask={createTask}
        formValues={formValues}
        setFormValues={setFormValues}
        show={show}
        setShow={setShow}
        handleLogout={handleLogout}
      />
      <TaskList
        data={taskList}
        setModalDetails={setModalDetails}
        setSelectedTask={setSelectedTask}
        selectedTask={selectedTask}
      />

      <ConfirmModal
        modalDetails={modalDetails}
        setModalDetails={setModalDetails}
        onConfirmOperation={onConfirmOperation}
      />
    </div>
  );
};

export default Home;
