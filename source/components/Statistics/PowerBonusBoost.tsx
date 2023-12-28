import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconPowerBonusBoost from "@neverquest/icons/power-bonus-boost.svg?react";
import { infusionEffect } from "@neverquest/state/items";
import { formatNumber } from "@neverquest/utilities/formatters";

export function PowerBonusBoost() {
  const infusionEffectTomeOfPower = infusionEffect("tome of power");

  const infusionEffectValue = useRecoilValue(infusionEffectTomeOfPower);

  useDeltaText({
    delta: "powerBonusBoost",
    format: "percentage",
    state: infusionEffectTomeOfPower,
  });

  return (
    <Stack direction="horizontal" gap={1}>
      <IconDisplay Icon={IconPowerBonusBoost} tooltip="Power bonus boost">
        +
        {formatNumber({
          format: "percentage",
          value: infusionEffectValue,
        })}
      </IconDisplay>

      <DeltasDisplay delta="powerBonusBoost" />
    </Stack>
  );
}
