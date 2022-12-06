import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../../component/header/header";
import TaskList from "../../component/taskList/taskList";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

const Home = () => {
  const [modalDetails, setModalDetails] = useState({
    show: false,
    message: "",
    variant: "success",
    heading: "",
    taskOperation: "",
  });
  const [selectedTask, setSelectedTask] = useState({});

  const [taskList, setTaskList] = useState([]);
  const [alertDetails, setAlertDetails] = useState({
    show: false,
    message: "",
  });
  const [formValues, setFormValues]= useState({
    title:""
  })
  const [show, setShow] = useState(false);


  const getTaskList = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getTaskList`);
    if (response.status === 200) {
      setTaskList(response.data.data);
    }
  };

  useEffect(() => {
    getTaskList();

    return ()=>{
      console.log("unmounted")
    }
  }, []);

  const onCompleteTask = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/updateTask/${selectedTask._id}`,
      {
        title:selectedTask.title,
        status: "C",
        _id:selectedTask._id
      }
    );
    if (response.status === 200) {
      setAlertDetails({
        show: true,
        message: response.data.message,
        variant: "success",
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
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/deleteTask/${selectedTask._id}`
    );
    if (response.status === 200) {
      getTaskList();
      setAlertDetails({
        show: true,
        message: response.data.message,
        variant: "success",
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

  const createTask=async()=>{
    const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/createTask`,{...formValues, status:"P"})
    if(response.status===200){
      setShow(false)
      setFormValues({title:""})
      getTaskList()
    }
  }

  return (
    <div className="home-conatiner">
      <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-dark position-relative"
      >
        <ToastContainer position="top-end" className="p-3">
          <Toast
            onClose={() =>
              setAlertDetails({
                show: false,
                message: "",
              })
            }
            show={alertDetails.show}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
                onClick={() =>
                  setAlertDetails({
                    show: true,
                    message: "",
                  })
                }
              />
              <strong className="me-auto">{alertDetails.message}</strong>
            </Toast.Header>
          </Toast>
        </ToastContainer>
      </div>

      <Header onCompleteTask={createTask} formValues={formValues} setFormValues={setFormValues} show={show} setShow={setShow}/>
      <TaskList
        data={taskList}
        setModalDetails={setModalDetails}
        setSelectedTask={setSelectedTask}
        selectedTask={selectedTask}
      />

      <Modal
        show={modalDetails.show}
        onHide={() =>
          setModalDetails({
            show: false,
            message: "",
            variant: "success",
          })
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalDetails.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalDetails.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() =>
              setModalDetails({
                show: false,
                message: "",
                variant: "secondary",
              })
            }
          >
            Close
          </Button>
          <Button
            type="submit"
            variant={modalDetails.variant}
            onClick={onConfirmOperation}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
