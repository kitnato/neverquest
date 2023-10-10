import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconPowerBonusBoost } from "@neverquest/icons/power-bonus-boost.svg";
import { deltas } from "@neverquest/state/deltas";
import { powerBonusBoost } from "@neverquest/state/items";
import { formatValue } from "@neverquest/utilities/formatters";

export function PowerBonusBoost() {
  const powerBonusBoostValue = useRecoilValue(powerBonusBoost);

  useDeltaText({
    delta: deltas("powerBonusBoost"),
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

      <FloatingText delta="powerBonusBoost" />
    </Stack>
  );
}
