import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { IconImageProps } from "@neverquest/types/props";

export function IconImage({
  Icon,
  isFlipped = false,
  isSmall = false,
  placement = "top",
  tooltip,
}: IconImageProps) {
  const IconStyled = () => (
    <Icon height={isSmall ? 12 : 36} style={{ transform: `scaleX(${isFlipped ? -1 : 1})` }} />
  );

  if (tooltip) {
    return (
      <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>} placement={placement}>
        <span>
          <IconStyled />
        </span>
      </OverlayTrigger>
    );
  }

  return <IconStyled />;
}
