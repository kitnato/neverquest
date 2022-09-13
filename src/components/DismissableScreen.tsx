import { ReactNode } from "react";
import Offcanvas, { OffcanvasPlacement } from "react-bootstrap/Offcanvas";

export default function ({
  contents,
  isShowing,
  onClose,
  placement = "end",
  title,
}: {
  contents: ReactNode;
  isShowing: boolean;
  onClose: () => void;
  placement?: OffcanvasPlacement;
  title: string;
}) {
  return (
    <Offcanvas
      onHide={onClose}
      placement={placement}
      show={isShowing}
      style={{ minWidth: 500, width: "33%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>{contents}</Offcanvas.Body>
    </Offcanvas>
  );
}
