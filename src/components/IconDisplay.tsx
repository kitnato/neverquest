import { ReactNode } from "react";
import { Stack } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import { IconImageDOMProps, SVGIcon } from "@neverquest/types/props";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function IconDisplay({
  contents,
  description,
  Icon,
  iconProps,
  isAnimated,
  isSpaced,
  tooltip,
}: {
  Icon: SVGIcon;
  contents: ReactNode;
  description?: ReactNode;
  iconProps?: IconImageDOMProps;
  isAnimated?: boolean;
  isSpaced?: boolean;
  tooltip: string;
}) {
  const { isFlipped, overlayPlacement } = iconProps || {};

  return (
    <Stack
      className={isAnimated ? getAnimationClass({ type: AnimationType.FlipInX }) : ""}
      direction="horizontal"
      gap={isSpaced ? 5 : 3}
      style={{ whiteSpace: "nowrap" }}
    >
      <IconImage
        Icon={Icon}
        isFlipped={isFlipped}
        overlayPlacement={overlayPlacement}
        tooltip={tooltip}
      />

      {description ? (
        <Stack>
          <span>{contents}</span>

          <small className="text-muted">{description}</small>
        </Stack>
      ) : typeof contents === "string" || Number.isInteger(contents) ? (
        <span>{contents}</span>
      ) : (
        contents
      )}
    </Stack>
  );
}
