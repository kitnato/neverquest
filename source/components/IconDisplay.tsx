import type { ReactNode } from "react";
import { Stack } from "react-bootstrap";

import type { ResponsiveUtilityValue } from "react-bootstrap/esm/createUtilityClasses";
import type { GapValue } from "react-bootstrap/esm/types";
import { IconImage } from "@neverquest/components/IconImage";
import type { IconImageDOMProperties, SVGIcon } from "@neverquest/types/components";

export function IconDisplay({
  children,
  className,
  description,
  gap = 3,
  Icon,
  iconProps,
  tooltip,
}: {
  children?: ReactNode;
  className?: string;
  description?: ReactNode;
  gap?: ResponsiveUtilityValue<GapValue>;
  Icon: SVGIcon;
  iconProps?: IconImageDOMProperties;
  tooltip?: string;
}) {
  return (
    <Stack className={className} direction="horizontal" gap={iconProps?.isSmall ? 1 : gap}>
      <IconImage Icon={Icon} tooltip={tooltip} {...iconProps} />

      <Stack gap={1}>
        {children}

        <div className="small text-muted">{description}</div>
      </Stack>
    </Stack>
  );
}