import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { monsterHealth, monsterHealthMaximum } from "@neverquest/state/monster";
import { formatValue } from "@neverquest/utilities/formatters";

export function MonsterHealthMeter() {
  const monsterHealthValue = useRecoilValue(monsterHealth);
  const monsterHealthMaximumValue = useRecoilValue(monsterHealthMaximum);

  return (
    <LabelledProgressBar
      label={`${formatValue({ value: monsterHealthValue })}/${formatValue({
        value: monsterHealthMaximumValue,
      })}`}
      value={(monsterHealthValue / monsterHealthMaximumValue) * 100}
      variant="dark"
    />
  );
}
