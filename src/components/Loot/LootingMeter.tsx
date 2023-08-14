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

  useAnimation({
    callback: (delta) => {
      const value = lootingDurationValue - delta;

      if (value <= 0) {
        progression();

        setLootingDuration(0);
      } else {
        setLootingDuration(value);
      }
    },
    stop: !isLootingValue,
  });

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(lootingDurationValue)}
      value={((lootingRateValue - lootingDurationValue) / lootingRateValue) * 100}
      variant="secondary"
    />
  );
}
