import { useState } from "react";
import { Modal } from "react-bootstrap";
import { QuestionSquare } from "react-bootstrap-icons";

import { UNKNOWN } from "@neverquest/constants";

export default function () {
  const [isShowing, setIsShowing] = useState(false);

  const handleShow = (state: boolean) => setIsShowing(state);

  return (
    <span>
      <QuestionSquare onClick={() => handleShow(true)} style={{ cursor: "pointer" }} />

      <Modal onHide={() => handleShow(false)} show={isShowing}>
        <Modal.Header closeButton>
          <Modal.Title>About</Modal.Title>
        </Modal.Header>

        <Modal.Body>{UNKNOWN}</Modal.Body>
      </Modal>
    </span>
  );
}
