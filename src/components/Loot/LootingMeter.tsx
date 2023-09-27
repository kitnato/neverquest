import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LOOTING_RATE } from "@neverquest/data/resources";
import { lootingDuration } from "@neverquest/state/character";
import { formatValue } from "@neverquest/utilities/formatters";

export function LootingMeter() {
  const lootingDurationValue = useRecoilValue(lootingDuration);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatValue({ format: "time", value: lootingDurationValue })}
      value={((LOOTING_RATE - lootingDurationValue) / LOOTING_RATE) * 100}
      variant="secondary"
    />
  );
}
