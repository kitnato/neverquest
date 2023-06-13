import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { monsterHealth, monsterHealthMaximum } from "@neverquest/state/monster";

export function MonsterHealthMeter() {
  const monsterHealthValue = useRecoilValue(monsterHealth);
  const monsterHealthMaximumValue = useRecoilValue(monsterHealthMaximum);

  return (
    <LabelledProgressBar
      label={`${monsterHealthValue}/${monsterHealthMaximumValue}`}
      value={(monsterHealthValue / monsterHealthMaximumValue) * 100}
      variant="dark"
    />
  );
}
