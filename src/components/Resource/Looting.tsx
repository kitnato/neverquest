import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LootingMeter } from "@neverquest/components/Resource/LootingMeter";
import { ReactComponent as Icon } from "@neverquest/icons/vulture.svg";
import { isLooting, lootingDuration, lootingRate } from "@neverquest/state/character";
import { progress } from "@neverquest/state/encounter";
import { isMonsterDead } from "@neverquest/state/monster";

export function Looting() {
  const isLootingValue = useRecoilValue(isLooting);
  const progressValue = useRecoilValue(progress);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const lootingRateValue = useRecoilValue(lootingRate);
  const setLootingDuration = useSetRecoilState(lootingDuration);

  useEffect(() => {
    if (isMonsterDeadValue) {
      setLootingDuration(lootingRateValue);
    }
  }, [isMonsterDeadValue, lootingRateValue, setLootingDuration]);

  if (!isLootingValue) {
    return progressValue === 0 ? null : <hr />;
  }

  return <IconDisplay contents={<LootingMeter />} Icon={Icon} isAnimated tooltip="Looting" />;
}
