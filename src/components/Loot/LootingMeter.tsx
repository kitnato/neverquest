import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LOOTING_RATE } from "@neverquest/data/statistics";
import { lootingDuration } from "@neverquest/state/character";
import { formatNumber } from "@neverquest/utilities/formatters";

export function LootingMeter() {
  const lootingDurationValue = useRecoilValue(lootingDuration);

  return (
    <LabelledProgressBar
      disableTransitions
      value={((LOOTING_RATE - lootingDurationValue) / LOOTING_RATE) * 100}
      variant="secondary"
    >
      {formatNumber({ format: "time", value: lootingDurationValue })}
    </LabelledProgressBar>
  );
}
