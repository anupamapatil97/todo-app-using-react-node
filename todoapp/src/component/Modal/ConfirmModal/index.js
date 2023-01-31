import React from 'react';
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

const ConfirmModal = ({
    modalDetails,
    setModalDetails,
    onConfirmOperation
}) => {
    return <div>
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
    </div>;
}



export default ConfirmModal;