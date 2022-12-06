import React, {useState} from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Modal } from "react-bootstrap";

const statusDetails = {
  C: "Completed",
  P: "Pending",
};

const TaskList = ({ data = [], setModalDetails, setSelectedTask, selectedTask }) => {
  const [show, setShow]=useState(false)
  return (
    <>
    <div className="container mt-5">
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.length > 0 ? (
            <>
              {data.map((ele, i) => (
                <tr key={i}>
                  <td>{ele._id}</td>
                  <td>{ele.title}</td>
                  <td>{statusDetails[ele.status]}</td>
                  <td className="col-sm-4">
                    <div>
                  <Button className="mx-2" disabled={ele.status==="C"} onClick={()=>{setSelectedTask(ele); setModalDetails({message:"Are you sure this task is completed", variant:"success", show:true, heading:"Completed Task", taskOperation:"C"})}} variant="success">Complete</Button>
                  <Button className="mx-2" onClick={()=>{setSelectedTask(ele); setModalDetails({message:"Are you sure you want to delete this task", variant:"danger", show:true, heading:"Delete Task",taskOperation:"D"})}} variant="danger">Delete</Button>
                  <Button  onClick={()=>{setSelectedTask(ele); setShow(true)}} variant="primary">View</Button>
                  </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr><td>No records found</td></tr>
          )}
        </tbody>
      </Table>
    </div>
    <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <p>Title : {selectedTask.title}</p>
              <p>Status : {statusDetails[selectedTask.status]}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskList;
