import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isLooting, lootingRate } from "@neverquest/state/character";
import { isLevelCompleted } from "@neverquest/state/encounter";
import { monsterCreate } from "@neverquest/state/monster";
import { lootDrop } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/helpers";

export default function LootingMeter() {
  const [isLootingValue, setLooting] = useAtom(isLooting);
  const isLevelCompletedValue = useAtomValue(isLevelCompleted);
  const lootingRateValue = useAtomValue(lootingRate);
  const createMonster = useSetAtom(monsterCreate);
  const dropLoot = useSetAtom(lootDrop);

  const [deltaLooting, setDeltaLooting] = useState(0);

  useAnimation((delta) => {
    setDeltaLooting((current) => current + delta);
  }, !isLootingValue);

  useEffect(() => {
    if (deltaLooting >= lootingRateValue) {
      dropLoot();
      setLooting(false);

      if (!isLevelCompletedValue) {
        createMonster();
      }
    }
  }, [deltaLooting, isLevelCompletedValue, lootingRateValue]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(lootingRateValue - deltaLooting)}
      value={(deltaLooting / lootingRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
