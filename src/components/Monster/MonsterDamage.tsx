import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DamagePerSecond } from "@neverquest/components/Statistics/DamagePerSecond";
import { DAMAGE_ICON } from "@neverquest/data/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { monsterDamage, monsterDamagePerSecond } from "@neverquest/state/monster";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";
import { ShowingType } from "@neverquest/types/enums";

export function MonsterDamage() {
  const monsterDamageValue = useRecoilValue(monsterDamage);
  const monsterDamagePerSecondValue = useRecoilValue(monsterDamagePerSecond);
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);
  const isShowingMonsterDamage = useRecoilValue(isShowing(ShowingType.MonsterDamage));

  if (!isShowingMonsterDamage) {
    return null;
  }

  return (
    <IconDisplay
      contents={monsterDamageValue}
      description={
        isShowingDamagePerSecondValue && (
          <DamagePerSecond damagePerSecond={monsterDamagePerSecondValue} />
        )
      }
      Icon={DAMAGE_ICON}
      isAnimated
      tooltip="Monster damage"
    />
  );
}
