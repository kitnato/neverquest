import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Gear } from "react-bootstrap-icons";

export default function Settings() {
  const [show, setShow] = useState(false);

  const handleShow = (state) => setShow(state);

  return (
    <span className="mx-2">
      <Gear style={{ cursor: "pointer" }} onClick={() => handleShow(true)} />

      <Modal show={show} onHide={() => handleShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>???</Modal.Body>
      </Modal>
    </span>
  );
}
