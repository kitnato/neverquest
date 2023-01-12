import { useRecoilState, useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useDropLoot from "@neverquest/hooks/actions/useDropLoot";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isLooting, lootingDuration, lootingRate } from "@neverquest/state/character";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function () {
  const [lootingDurationValue, setLootingDuration] = useRecoilState(lootingDuration);
  const isLootingValue = useRecoilValue(isLooting);
  const lootingRateValue = useRecoilValue(lootingRate);

  const dropLoot = useDropLoot();

  const lootingProgress = lootingRateValue - lootingDurationValue;

  useAnimation((delta) => {
    let newDuration = lootingDurationValue - delta;

    if (newDuration <= 0) {
      newDuration = 0;
      dropLoot();
    }

    setLootingDuration(newDuration);
  }, !isLootingValue);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(lootingProgress)}
      value={(lootingProgress / lootingRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
