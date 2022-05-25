import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";

import LabelledProgressBar from "neverquest/components/LabelledProgressBar";
import useAnimation from "neverquest/hooks/useAnimation";
import useNewMonster from "neverquest/hooks/useNewMonster";
import useRewardKill from "neverquest/hooks/useRewardKill";
import { isLooting, lootingRate } from "neverquest/state/character";
import { UIVariant } from "neverquest/types/ui";
import { formatMilliseconds } from "neverquest/utilities/helpers";

export default function LootingMeter() {
  const [isLootingValue, setLooting] = useAtom(isLooting);
  const lootingRateValue = useAtomValue(lootingRate);
  const [deltaLooting, setDeltaLooting] = useState(0);

  const newMonster = useNewMonster();
  const rewardKill = useRewardKill();

  useAnimation((delta) => {
    setDeltaLooting((current) => current + delta);
  }, !isLootingValue);

  useEffect(() => {
    if (deltaLooting >= lootingRateValue) {
      rewardKill();
      newMonster();
      setLooting(false);
    }
  }, [deltaLooting, lootingRateValue]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(lootingRateValue - deltaLooting)}
      value={(deltaLooting / lootingRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
