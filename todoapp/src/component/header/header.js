import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Header = ({
  formValues,
  setFormValues,
  show,
  setShow,
  onCompleteTask,
  handleLogout,
}) => {
  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="/" className="text-white">
            TODO APP
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button variant="success" onClick={() => setShow(true)}>
              Add Task
            </Button>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTask">
              <Form.Label>Task</Form.Label>
              <Form.Control
                name="title"
                value={formValues.title}
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
                type="text"
                placeholder="Enter Task"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={onCompleteTask}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
