import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { UIVariant } from "neverquest/types/ui";

export default function ConfirmationDialog({
  confirmationLabel,
  onConfirm,
  message,
  setHide,
  show,
  title,
}: {
  confirmationLabel: string;
  onConfirm: () => void;
  message: string;
  setHide: () => void;
  show: boolean;
  title: string;
}) {
  return (
    <Modal backdrop="static" onHide={setHide} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => {
            onConfirm();
            setHide();
          }}
          variant={UIVariant.Outline}
        >
          {confirmationLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
