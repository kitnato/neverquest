import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DAMAGE_ICON } from "@neverquest/data/attributes";
import { monsterDamage, monsterDamagePerSecond } from "@neverquest/state/monster";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";

export function MonsterDamage() {
  const monsterDamageValue = useRecoilValue(monsterDamage);
  const monsterDamagePerSecondValue = useRecoilValue(monsterDamagePerSecond);
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);

  return (
    <IconDisplay
      contents={monsterDamageValue}
      description={isShowingDamagePerSecondValue ? `${monsterDamagePerSecondValue} DPS` : null}
      Icon={DAMAGE_ICON}
      tooltip="Monster damage"
    />
  );
}
