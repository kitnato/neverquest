import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDropLoot } from "@neverquest/hooks/actions/useDropLoot";
import { useProgression } from "@neverquest/hooks/actions/useProgression";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { isLooting, lootingDuration, lootingRate } from "@neverquest/state/character";

import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function LootingMeter() {
  const [lootingDurationValue, setLootingDuration] = useRecoilState(lootingDuration);
  const isLootingValue = useRecoilValue(isLooting);
  const lootingRateValue = useRecoilValue(lootingRate);

  const dropLoot = useDropLoot();
  const progression = useProgression();

  const lootingProgress = lootingRateValue - lootingDurationValue;

  useAnimation((delta) => {
    let newDuration = lootingDurationValue - delta;

    if (newDuration <= 0) {
      newDuration = 0;

      dropLoot();
      progression();
    }

    setLootingDuration(newDuration);
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
