import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { monsterHealth, monsterHealthMaximum } from "@neverquest/state/monster";
import { formatNumber } from "@neverquest/utilities/formatters";

export function MonsterHealthMeter() {
  const monsterHealthValue = useRecoilValue(monsterHealth);
  const monsterHealthMaximumValue = useRecoilValue(monsterHealthMaximum);

  return (
    <LabelledProgressBar
      value={(monsterHealthValue / monsterHealthMaximumValue) * 100}
      variant="dark"
    >{`${formatNumber({ value: monsterHealthValue })}/${formatNumber({
      value: monsterHealthMaximumValue,
    })}`}</LabelledProgressBar>
  );
}
