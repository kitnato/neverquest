import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconDamagePerSecond } from "@neverquest/icons/damage-per-second.svg";
import { monsterDamagePerSecond, monsterDamageTotalPerSecond } from "@neverquest/state/monster";
import { showDamagePerSecond } from "@neverquest/state/settings";

export function MonsterDamagePerSecond() {
  const monsterDamagePerSecondValue = useRecoilValue(monsterDamagePerSecond);
  const monsterDamageTotalPerSecondValue = useRecoilValue(monsterDamageTotalPerSecond);
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);

  if (!showDamagePerSecondValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={`${monsterDamageTotalPerSecondValue}${
        monsterDamagePerSecondValue === monsterDamageTotalPerSecondValue
          ? ""
          : ` (${monsterDamagePerSecondValue})`
      }`}
      Icon={IconDamagePerSecond}
      iconProps={{ overlayPlacement: "bottom", size: "small" }}
      tooltip="Damage per second"
    />
  );
}
