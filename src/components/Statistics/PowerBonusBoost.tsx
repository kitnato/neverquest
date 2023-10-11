import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconPowerBonusBoost } from "@neverquest/icons/power-bonus-boost.svg";
import { powerBonusBoost } from "@neverquest/state/items";
import { formatValue } from "@neverquest/utilities/formatters";

export function PowerBonusBoost() {
  const powerBonusBoostValue = useRecoilValue(powerBonusBoost);

  useDeltaText({
    delta: "powerBonusBoost",
    format: "percentage",
    value: powerBonusBoost,
  });

  return (
    <Stack direction="horizontal">
      <IconDisplay
        contents={`+${formatValue({ format: "percentage", value: powerBonusBoostValue })}`}
        Icon={IconPowerBonusBoost}
        tooltip="Power bonus boost"
      />

      <FloatingTextQueue delta="powerBonusBoost" />
    </Stack>
  );
}
