import type { ReactNode } from "react";
import { Badge } from "react-bootstrap";

export function IconBadge({
  alignToButton,
  children,
}: {
  alignToButton?: boolean;
  children: ReactNode;
}) {
  return (
    <Badge
      bg="secondary"
      className={
        alignToButton ? "position-absolute top-50 start-100 translate-middle" : "align-middle"
      }
    >
      {children}
    </Badge>
  );
}
