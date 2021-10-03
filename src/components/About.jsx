import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { QuestionSquare } from "react-bootstrap-icons";

export default function About() {
  const [show, setShow] = useState(false);

  const handleShow = (state) => setShow(state);

  return (
    <span>
      <QuestionSquare
        style={{ cursor: "pointer" }}
        onClick={() => handleShow(true)}
      />

      <Modal show={show} onHide={() => handleShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>About</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          The darkness is stirring with hostile intentions.
        </Modal.Body>
      </Modal>
    </span>
  );
}
