import Modal from "react-bootstrap/Modal";

// TODO - refactor as right-aligned Bootstrap 5 Offcanvas
export default function DismissableScreen({
  content,
  isShowing,
  onClose,
  title,
}) {
  return (
    <Modal
      backdrop={false}
      dialogClassName="modal-offcanvas"
      onHide={onClose}
      show={isShowing}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{content}</Modal.Body>
    </Modal>
  );
}
