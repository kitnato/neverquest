import { Button, Modal, Stack } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconWarning } from "@neverquest/icons/warning.svg";

export function ConfirmationDialog({
  confirmationLabel,
  message,
  onConfirm,
  setHidden,
  show,
  title,
}: {
  confirmationLabel: string;
  message: string;
  onConfirm: () => void;
  setHidden: () => void;
  show: boolean;
  title: string;
}) {
  const handleConfirmation = () => {
    onConfirm();
    setHidden();
  };

  return (
    <Modal backdrop="static" onHide={setHidden} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={3}>
            <IconImage Icon={IconWarning} />

            {title}
          </Stack>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button onClick={handleConfirmation} variant="outline-dark">
          {confirmationLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
