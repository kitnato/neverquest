import { Badge } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import type { SVGIcon } from "@neverquest/types/props";

export function ButtonBadge({ Icon, isShowing }: { Icon: SVGIcon; isShowing: boolean }) {
  if (!isShowing) {
    return null;
  }

  return (
    <Badge bg="secondary" className="position-absolute" style={{ right: -18, top: 12 }}>
      <IconImage Icon={Icon} size="small" />
    </Badge>
  );
}
