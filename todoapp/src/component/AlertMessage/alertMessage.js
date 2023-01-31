import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
const AlertMessage = ({
showAlert, 
setShowAlert,
}) => {
    return (
    <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-dark position-relative"
      >
    <ToastContainer position="top-end" className="p-3">
    <Toast onClose={() => setShowAlert({
      ...showAlert, show:false
    })} show={showAlert.show} autohide>
      <Toast.Header>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded me-2"
          alt=""
        />
       <strong className="me-auto" style={{color:showAlert.colorName}}>{showAlert.message}</strong>
      </Toast.Header>
     
    </Toast>
  
  </ToastContainer>
  </div>
  )
}


export default AlertMessage;