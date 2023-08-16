import { Badge } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import type { SVGIcon } from "@neverquest/types/props";
import type { Animation } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function ButtonBadge({
  animation,
  Icon,
  isShowing,
  onAnimationEnd,
}: {
  animation?: Animation;
  Icon: SVGIcon;
  isShowing: boolean;
  onAnimationEnd?: () => void;
}) {
  if (!isShowing) {
    return null;
  }

  return (
    <Badge
      bg="secondary"
      className={`position-absolute${
        animation !== undefined ? ` ${getAnimationClass({ type: animation })}` : ""
      }`}
      onAnimationEnd={onAnimationEnd}
      style={{ top: 12 }}
    >
      <IconImage Icon={Icon} size="tiny" />
    </Badge>
  );
}
