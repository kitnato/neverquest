import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import useReset from "neverquest/hooks/useReset";
import { UIVariant } from "neverquest/types/ui";

export default function Reset({
  title,
  message,
  show,
  setHide,
}: {
  title: string;
  message: string;
  show: boolean;
  setHide: () => void;
}) {
  const reset = useReset();

  return (
    <Modal show={show} onHide={setHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => {
            reset();
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
