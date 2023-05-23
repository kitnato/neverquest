import type { ReactNode } from "react";
import { Offcanvas } from "react-bootstrap";
import type { OffcanvasPlacement } from "react-bootstrap/Offcanvas";

export function DismissableScreen({
  children,
  isShowing,
  onClose,
  placement = "end",
  title,
}: {
  children: ReactNode;
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

      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
}
