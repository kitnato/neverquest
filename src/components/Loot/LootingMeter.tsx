import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LOOTING_RATE } from "@neverquest/data/resources";
import { useProgression } from "@neverquest/hooks/actions/useProgression";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { isLooting, lootingDuration } from "@neverquest/state/character";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function LootingMeter() {
  const [lootingDurationValue, setLootingDuration] = useRecoilState(lootingDuration);
  const isLootingValue = useRecoilValue(isLooting);

  const progression = useProgression();

  useAnimate({
    deltas: [setLootingDuration],
    stop: !isLootingValue,
  });

  useEffect(() => {
    if (lootingDurationValue === 0) {
      progression();
    }
  }, [lootingDurationValue, progression]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(lootingDurationValue)}
      value={((LOOTING_RATE - lootingDurationValue) / LOOTING_RATE) * 100}
      variant="secondary"
    />
  );
}
