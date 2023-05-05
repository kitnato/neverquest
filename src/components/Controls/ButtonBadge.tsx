import { Badge } from "react-bootstrap";

import { ICON_SIZE_INLAY } from "@neverquest/data/constants";
import type { SVGIcon } from "@neverquest/types/props";

export function ButtonBadge({ Icon, isShowing }: { Icon: SVGIcon; isShowing: boolean }) {
  if (!isShowing) {
    return null;
  }

  return (
    <Badge bg="secondary" className="position-absolute" style={{ top: 12 }}>
      <Icon width={ICON_SIZE_INLAY} />
    </Badge>
  );
}
