import type { Placement } from "react-bootstrap/esm/types";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import IconInfusionLevel from "@neverquest/icons/infusion-level.svg?react";
import { formatValue } from "@neverquest/utilities/formatters";

export function InfusionLevelDisplay({
  level,
  overlayPlacement = "bottom",
}: {
  level: number;
  overlayPlacement?: Placement;
}) {
  return (
    <IconDisplay
      contents={formatValue({ value: level })}
      Icon={IconInfusionLevel}
      iconProps={{ overlayPlacement, size: "small" }}
      tooltip="Infusion level"
    />
  );
}
