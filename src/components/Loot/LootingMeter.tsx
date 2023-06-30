import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useProgression } from "@neverquest/hooks/actions/useProgression";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { isLooting, lootingDuration, lootingRate } from "@neverquest/state/character";

import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function LootingMeter() {
  const [lootingDurationValue, setLootingDuration] = useRecoilState(lootingDuration);
  const isLootingValue = useRecoilValue(isLooting);
  const lootingRateValue = useRecoilValue(lootingRate);

  const progression = useProgression();

  const lootingProgress = lootingRateValue - lootingDurationValue;

  useAnimation((delta) => {
    setLootingDuration((current) => {
      const value = current - delta;

      if (value <= 0) {
        progression();

        return 0;
      }

      return value;
    });
  }, !isLootingValue);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(lootingProgress)}
      value={(lootingProgress / lootingRateValue) * 100}
      variant="secondary"
    />
  );
}
