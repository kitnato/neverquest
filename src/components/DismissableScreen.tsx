import type { ReactNode } from "react";
import { Offcanvas } from "react-bootstrap";
import type { OffcanvasPlacement } from "react-bootstrap/Offcanvas";

export function DismissableScreen({
  children,
  hideScroll = false,
  isShowing,
  onClose,
  placement = "end",
  title,
}: {
  children: ReactNode;
  hideScroll?: boolean;
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

      <Offcanvas.Body style={{ overflowY: hideScroll ? "hidden" : "auto" }}>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
