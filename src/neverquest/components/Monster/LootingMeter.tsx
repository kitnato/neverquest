import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Progress from "neverquest/components/Progress";
import { UIVariant } from "neverquest/env";
import useAnimation from "neverquest/hooks/useAnimation";
import useNewMonster from "neverquest/hooks/useNewMonster";
import useRewardKill from "neverquest/hooks/useRewardKill";
import { isLooting, lootingRate } from "neverquest/state/character";
import { formatMilliseconds } from "neverquest/utilities/helpers";

export default function LootingMeter() {
  const [isLootingValue, setLooting] = useRecoilState(isLooting);
  const lootingRateValue = useRecoilValue(lootingRate);
  const [deltaLooting, setDeltaLooting] = useState(0);

  const newMonster = useNewMonster();
  const rewardKill = useRewardKill();

  useAnimation((deltaTime) => {
    setDeltaLooting((currentDelta) => currentDelta + deltaTime);
  }, !isLootingValue);

  useEffect(() => {
    if (deltaLooting >= lootingRateValue) {
      rewardKill();
      newMonster();
      setLooting(false);
    }
  }, [deltaLooting, lootingRateValue]);

  return (
    <Progress
      disableTransitions
      label={formatMilliseconds(lootingRateValue - deltaLooting)}
      value={(deltaLooting / lootingRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
