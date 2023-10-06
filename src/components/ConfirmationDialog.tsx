import type { ReactNode } from "react";
import { Button, Modal, Stack } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import type { SVGIcon } from "@neverquest/types/props";

export function ConfirmationDialog({
  confirmationLabel,
  contents,
  Icon,
  onConfirm,
  setHidden,
  show,
  title,
}: {
  confirmationLabel: string;
  contents: ReactNode;
  Icon: SVGIcon;
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
            <IconImage Icon={Icon} />

            {title}
          </Stack>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>{contents}</Modal.Body>

      <Modal.Footer>
        <Button onClick={handleConfirmation} variant="outline-dark">
          {confirmationLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
