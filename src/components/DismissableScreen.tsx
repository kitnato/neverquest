import { ReactNode } from "react";
import { Offcanvas } from "react-bootstrap";
import { OffcanvasPlacement } from "react-bootstrap/Offcanvas";

export function DismissableScreen({
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
    <Offcanvas onHide={onClose} placement={placement} show={isShowing}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>{contents}</Offcanvas.Body>
    </Offcanvas>
  );
}
