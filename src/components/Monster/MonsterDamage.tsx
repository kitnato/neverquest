import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconDamagePerSecond } from "@neverquest/icons/damage-per-second.svg";
import { ReactComponent as IconDamage } from "@neverquest/icons/damage.svg";
import {
  monsterDamage,
  monsterDamagePerSecond,
  monsterDamageTotal,
  monsterDamageTotalPerSecond,
} from "@neverquest/state/monster";
import { showDamagePerSecond } from "@neverquest/state/settings";

export function MonsterDamage() {
  const monsterDamageValue = useRecoilValue(monsterDamage);
  const monsterDamagePerSecondValue = useRecoilValue(monsterDamagePerSecond);
  const monsterDamageTotalValue = useRecoilValue(monsterDamageTotal);
  const monsterDamageTotalPerSecondValue = useRecoilValue(monsterDamageTotalPerSecond);
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);

  return (
    <IconDisplay
      contents={`${monsterDamageTotalValue}${
        monsterDamageValue === monsterDamageTotalValue ? "" : ` (${monsterDamageValue})`
      }`}
      description={
        showDamagePerSecondValue && (
          <IconDisplay
            contents={`${monsterDamageTotalPerSecondValue}${
              monsterDamagePerSecondValue === monsterDamageTotalPerSecondValue
                ? ""
                : ` (${monsterDamagePerSecondValue})`
            }`}
            Icon={IconDamagePerSecond}
            iconProps={{ ignoreColor: true, overlayPlacement: "bottom", size: "tiny" }}
            tooltip="Damage per second"
          />
        )
      }
      Icon={IconDamage}
      isAnimated
      tooltip="Monster damage"
    />
  );
}
