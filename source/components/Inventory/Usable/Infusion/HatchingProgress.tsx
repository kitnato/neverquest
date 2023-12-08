import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconHatchingProgress from "@neverquest/icons/hatching-progress.svg?react";
import { infusablePower } from "@neverquest/state/items";
import { formatNumber } from "@neverquest/utilities/formatters";

export function HatchingProgress() {
  const infusablePowerState = infusablePower("mysterious egg");

  const infusablePowerValue = useRecoilValue(infusablePowerState);

  useDeltaText({
    delta: "hatchingProgress",
    format: "percentage",
    state: infusablePowerState,
  });

  return (
    <Stack direction="horizontal" gap={1}>
      <IconDisplay Icon={IconHatchingProgress} tooltip="Hatching progress">
        {formatNumber({
          format: "percentage",
          value: infusablePowerValue,
        })}
      </IconDisplay>

      <DeltasDisplay delta="hatchingProgress" />
    </Stack>
  );
}
