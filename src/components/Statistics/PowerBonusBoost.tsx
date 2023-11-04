import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconPowerBonusBoost from "@neverquest/icons/power-bonus-boost.svg?react";
import { powerBonusBoost } from "@neverquest/state/items";
import { formatNumber } from "@neverquest/utilities/formatters";

export function PowerBonusBoost() {
  const powerBonusBoostValue = useRecoilValue(powerBonusBoost);

  useDeltaText({
    delta: "powerBonusBoost",
    format: "percentage",
    state: powerBonusBoost,
  });

  return (
    <Stack direction="horizontal" gap={1}>
      <IconDisplay Icon={IconPowerBonusBoost} tooltip="Power bonus boost">{`+${formatNumber({
        format: "percentage",
        value: powerBonusBoostValue,
      })}`}</IconDisplay>

      <FloatingTextQueue delta="powerBonusBoost" />
    </Stack>
  );
}
