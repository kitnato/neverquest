import { Button, Modal } from "react-bootstrap";

import { UIVariant } from "@neverquest/types/ui";

export function ConfirmationDialog({
  confirmationLabel,
  message,
  onConfirm,
  setHide,
  show,
  title,
}: {
  confirmationLabel: string;
  message: string;
  onConfirm: () => void;
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
