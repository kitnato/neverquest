import { OverlayTrigger, Tooltip } from "react-bootstrap";

import type { IconImageProps } from "@neverquest/types/props";

export function IconImage({
  Icon,
  ignoreColor = false,
  isFlipped = false,
  isMirrored = false,
  isSmall = false,
  overlayPlacement,
  tooltip,
}: IconImageProps) {
  const IconStyled = () => (
    <Icon
      className={`icon-image ${isSmall ? "small" : ""} ${ignoreColor ? "color-default" : ""}`}
      style={{ transform: `scaleX(${isMirrored ? -1 : 1}) scaleY(${isFlipped ? -1 : 1})` }}
    />
  );

  if (tooltip === undefined) {
    return <IconStyled />;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>} placement={overlayPlacement}>
      <span>
        <IconStyled />
      </span>
    </OverlayTrigger>
  );
}
