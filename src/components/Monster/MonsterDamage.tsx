import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconDamagePerSecond } from "@neverquest/icons/damage-per-second.svg";
import { ReactComponent as IconDamage } from "@neverquest/icons/damage.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { monsterDamage, monsterDamagePerSecond } from "@neverquest/state/monster";
import { showDamagePerSecond } from "@neverquest/state/settings";
import { ShowingType } from "@neverquest/types/enums";

export function MonsterDamage() {
  const monsterDamageValue = useRecoilValue(monsterDamage);
  const monsterDamagePerSecondValue = useRecoilValue(monsterDamagePerSecond);
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);
  const isShowingMonsterDamage = useRecoilValue(isShowing(ShowingType.MonsterDamage));

  if (!isShowingMonsterDamage) {
    return null;
  }

  return (
    <IconDisplay
      contents={monsterDamageValue}
      description={
        showDamagePerSecondValue && (
          <IconDisplay
            contents={monsterDamagePerSecondValue}
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
