import { useState } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { QuestionSquare } from "react-bootstrap-icons";

import { LABEL_UNKNOWN } from "@neverquest/constants";

export function About() {
  const [isShowing, setIsShowing] = useState(false);

  const handleShow = (state: boolean) => setIsShowing(state);

  const aboutLabel = "About";

  return (
    <span>
      <OverlayTrigger overlay={<Tooltip>{aboutLabel}</Tooltip>} placement="bottom">
        <QuestionSquare onClick={() => handleShow(true)} style={{ cursor: "pointer" }} />
      </OverlayTrigger>

      <Modal onHide={() => handleShow(false)} show={isShowing}>
        <Modal.Header closeButton>
          <Modal.Title>About</Modal.Title>
        </Modal.Header>

        <Modal.Body>{LABEL_UNKNOWN}</Modal.Body>
      </Modal>
    </span>
  );
}
