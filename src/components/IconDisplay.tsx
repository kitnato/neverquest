import type { ReactNode } from "react";
import { Stack } from "react-bootstrap";

import type { ResponsiveUtilityValue } from "react-bootstrap/esm/createUtilityClasses";
import type { GapValue } from "react-bootstrap/esm/types";
import { IconImage } from "@neverquest/components/IconImage";
import type { IconImageDOMProperties, SVGIcon } from "@neverquest/types/components";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function IconDisplay({
  children,
  description,
  gap = 3,
  Icon,
  iconProps,
  isAnimated = false,
  isFullWidth = false,
  tooltip,
}: {
  children?: ReactNode;
  description?: ReactNode;
  gap?: ResponsiveUtilityValue<GapValue>;
  Icon: SVGIcon;
  iconProps?: IconImageDOMProperties;
  isAnimated?: boolean;
  isFullWidth?: boolean;
  tooltip?: string;
}) {
  const classes = [
    isFullWidth ? "w-100" : undefined,
    isAnimated ? getAnimationClass({ name: "flipInX" }) : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Stack
      className={classes === "" ? undefined : classes}
      direction="horizontal"
      gap={iconProps?.isSmall ? 1 : gap}
    >
      <IconImage Icon={Icon} tooltip={tooltip} {...iconProps} />

      <Stack gap={1}>
        {children}

        <small className="text-muted">{description}</small>
      </Stack>
    </Stack>
  );
}
