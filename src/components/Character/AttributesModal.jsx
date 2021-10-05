import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Attributes from "components/Attributes";

export default function AttributesModal({ isShowing, onHide }) {
  return (
    <Modal centered onHide={onHide} show={isShowing} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Attributes</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Attributes />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide} variant="outline-dark">
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
