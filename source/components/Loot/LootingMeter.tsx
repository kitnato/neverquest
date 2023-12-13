import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_EMPTY, PERCENTAGE_POINTS } from "@neverquest/data/general";
import { LOOTING_RATE } from "@neverquest/data/statistics";
import { isLooting, lootingDuration } from "@neverquest/state/character";
import { formatNumber } from "@neverquest/utilities/formatters";

export function LootingMeter() {
  const isLootingValue = useRecoilValue(isLooting);
  const lootingDurationValue = useRecoilValue(lootingDuration);

  return (
    <LabelledProgressBar
      disableTransitions
      value={
        isLootingValue
          ? ((LOOTING_RATE - lootingDurationValue) / LOOTING_RATE) * PERCENTAGE_POINTS
          : 0
      }
      variant="secondary"
    >
      <span>
        {isLootingValue
          ? formatNumber({ format: "time", value: lootingDurationValue })
          : LABEL_EMPTY}
      </span>
    </LabelledProgressBar>
  );
}
