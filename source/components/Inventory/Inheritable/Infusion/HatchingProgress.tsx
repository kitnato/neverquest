import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconHatchingProgress from "@neverquest/icons/hatching-progress.svg?react";
import { infusionEffect } from "@neverquest/state/items";
import { formatNumber } from "@neverquest/utilities/formatters";

export function HatchingProgress() {
  const infusionEffectMysteriousEgg = infusionEffect("mysterious egg");

  const infusionEffectValue = useRecoilValue(infusionEffectMysteriousEgg);

  useDeltaText({
    delta: "hatchingProgress",
    format: "percentage",
    state: infusionEffectMysteriousEgg,
  });

  return (
    <Stack direction="horizontal" gap={1}>
      <IconDisplay Icon={IconHatchingProgress} tooltip="Hatching progress">
        {formatNumber({
          format: "percentage",
          value: infusionEffectValue,
        })}
      </IconDisplay>

      <DeltasDisplay delta="hatchingProgress" />
    </Stack>
  );
}
