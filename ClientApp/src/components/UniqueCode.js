import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CodeModal = ({ isOpen, toggle, uniqueCode }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Unique Code</ModalHeader>
      <ModalBody>
        <p>
          Your unique code is:
          <strong>{uniqueCode || "Code not available"}</strong>
        </p>

        <p>Please make sure to save this code before closing.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CodeModal;
