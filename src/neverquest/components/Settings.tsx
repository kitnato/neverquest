import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Gear } from "react-bootstrap-icons";

import { UNKNOWN } from "neverquest/utilities/constants";

export default function Settings() {
  const [isShowing, setShowing] = useState(false);

  const handleShow = (state: boolean) => setShowing(state);

  return (
    <span>
      <Gear style={{ cursor: "pointer" }} onClick={() => handleShow(true)} />

      <Modal show={isShowing} onHide={() => handleShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>{UNKNOWN}</Modal.Body>
      </Modal>
    </span>
  );
}
