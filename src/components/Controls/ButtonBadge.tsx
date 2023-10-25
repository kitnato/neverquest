import type { ReactNode } from "react";
import { Badge } from "react-bootstrap";

export function ButtonBadge({ children, isShowing }: { children: ReactNode; isShowing: boolean }) {
  if (!isShowing) {
    return null;
  }

  return (
    <Badge bg="secondary" className="position-absolute" style={{ right: -18, top: 12 }}>
      {children}
    </Badge>
  );
}
