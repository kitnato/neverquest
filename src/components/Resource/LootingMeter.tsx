import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useDropLoot from "@neverquest/hooks/actions/useDropLoot";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isLooting, lootingRate } from "@neverquest/state/character";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function () {
  const isLootingValue = useRecoilValue(isLooting);
  const lootingRateValue = useRecoilValue(lootingRate);

  const [deltaLooting, setDeltaLooting] = useState(0);

  const dropLoot = useDropLoot();

  useAnimation((delta) => {
    setDeltaLooting((current) => current + delta);
  }, !isLootingValue);

  useEffect(() => {
    if (deltaLooting >= lootingRateValue) {
      setDeltaLooting(0);
      dropLoot();
    }
  }, [deltaLooting, dropLoot, lootingRateValue]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(lootingRateValue - deltaLooting)}
      value={(deltaLooting / lootingRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
