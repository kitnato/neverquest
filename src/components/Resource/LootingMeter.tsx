import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useCreateMonster from "@neverquest/hooks/actions/useCreateMonster";
import useDropLoot from "@neverquest/hooks/actions/useDropLoot";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isLooting, lootingRate } from "@neverquest/state/character";
import { isLevelCompleted } from "@neverquest/state/encounter";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/helpers";

export default function () {
  const [isLootingValue, setLooting] = useRecoilState(isLooting);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const lootingRateValue = useRecoilValue(lootingRate);
  const createMonster = useCreateMonster();
  const dropLoot = useDropLoot();

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
  }, [createMonster, deltaLooting, dropLoot, isLevelCompletedValue, lootingRateValue, setLooting]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(lootingRateValue - deltaLooting)}
      value={(deltaLooting / lootingRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
