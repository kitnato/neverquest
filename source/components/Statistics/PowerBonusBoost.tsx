import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconPowerBonusBoost from "@neverquest/icons/power-bonus-boost.svg?react";
import { infusablePower } from "@neverquest/state/items";
import { formatNumber } from "@neverquest/utilities/formatters";

export function PowerBonusBoost() {
  const infusablePowerState = infusablePower("tome of power");

  const infusablePowerValue = useRecoilValue(infusablePowerState);

  useDeltaText({
    delta: "powerBonusBoost",
    format: "percentage",
    state: infusablePowerState,
  });

  return (
    <Stack direction="horizontal" gap={1}>
      <IconDisplay Icon={IconPowerBonusBoost} tooltip="Power bonus boost">
        +
        {formatNumber({
          format: "percentage",
          value: infusablePowerValue,
        })}
      </IconDisplay>

      <DeltasDisplay delta="powerBonusBoost" />
    </Stack>
  );
}
