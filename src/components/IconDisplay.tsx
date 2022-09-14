import { ReactNode } from "react";
import { Stack } from "react-bootstrap";

import IconImage from "@neverquest/components/IconImage";
import { IconImageProps, SVGIcon } from "@neverquest/types/props";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function ({
  contents,
  Icon,
  iconProps,
  isAnimated,
  isDescription,
  tooltip,
}: {
  animation?: AnimationType;
  contents: ReactNode;
  Icon: SVGIcon;
  iconProps?: Partial<IconImageProps>;
  isAnimated?: boolean;
  isDescription?: boolean;
  tooltip: string;
}) {
  const { isFlipped, placement } = iconProps || {};

  return (
    <Stack
      className={isAnimated ? getAnimationClass({ type: AnimationType.FlipInX }) : ""}
      direction="horizontal"
      gap={3}
    >
      <IconImage Icon={Icon} isFlipped={isFlipped} placement={placement} tooltip={tooltip} />

      {isDescription ? (
        <Stack>
          <span>{tooltip}</span>

          <small className="text-muted">{contents}</small>
        </Stack>
      ) : typeof contents === "string" || typeof contents === "number" ? (
        <span>{contents}</span>
      ) : (
        contents
      )}
    </Stack>
  );
}
