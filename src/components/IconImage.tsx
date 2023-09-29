import { OverlayTrigger, Tooltip } from "react-bootstrap";

import type { IconImageProps } from "@neverquest/types/props";

export function IconImage({
  Icon,
  ignoreColor = false,
  isFlipped = false,
  isMirrored = false,
  isStencilled = false,
  onClick,
  overlayPlacement,
  size,
  tooltip,
}: IconImageProps) {
  const IconStyled = () => (
    <Icon
      className={`icon-image${` ${size}` ?? ""}${ignoreColor ? " text-body" : ""}${
        isStencilled ? " stencilled" : ""
      }`}
      onClick={onClick}
      style={{
        cursor: onClick !== undefined ? "pointer" : "inherit",
        transform: `scaleX(${isMirrored ? -1 : 1}) scaleY(${isFlipped ? -1 : 1})`,
      }}
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
