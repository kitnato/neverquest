import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { UIVariant } from "neverquest/env";

export default function Reset({
  title,
  message,
  resetSeed,
  show,
  setHide,
}: {
  title: string;
  message: string;
  resetSeed: () => void;
  show: boolean;
  setHide: () => void;
}) {
  return (
    <Modal show={show} onHide={() => setHide()}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => {
            resetSeed();
            setHide();
          }}
          variant={UIVariant.Outline}
        >
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
