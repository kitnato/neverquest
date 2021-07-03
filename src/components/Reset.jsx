import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Reset({ title, message, resetSeed, show, setHide }) {
  return (
    <Modal show={show} onHide={() => setHide()}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-dark"
          onClick={() => {
            resetSeed();
            setHide();
          }}
        >
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
