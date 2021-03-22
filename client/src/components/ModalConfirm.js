import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalConfirm = ({ handleConfirm, handleClose, showModal }) => {
  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          <p>Are you sure delete the user</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalConfirm;
