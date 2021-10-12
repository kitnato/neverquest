import Modal from "react-bootstrap/Modal";

import Attributes from "components/Attributes";

// TODO - refactor with Bootstrap 5 Offcanvas
export default function AttributesModal({ isShowing, onClose }) {
  return (
    <Modal
      backdrop={false}
      dialogClassName="modal-offcanvas"
      onHide={onClose}
      show={isShowing}
    >
      <Modal.Header closeButton>
        <Modal.Title>Attributes</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Attributes />
      </Modal.Body>
    </Modal>
  );
}
