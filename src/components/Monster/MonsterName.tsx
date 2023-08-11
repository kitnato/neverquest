import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconBoss } from "@neverquest/icons/boss.svg";
import { ReactComponent as IconAttacking } from "@neverquest/icons/monster-attacking.svg";
import { ReactComponent as IconCorpse } from "@neverquest/icons/monster-corpse.svg";
import { ReactComponent as IconLurking } from "@neverquest/icons/monster-lurking.svg";
import { isAttacking } from "@neverquest/state/character";
import { isBoss } from "@neverquest/state/encounter";
import { isMonsterDead, monsterName } from "@neverquest/state/monster";

export function MonsterName() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isBossValue = useRecoilValue(isBoss);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const monsterNameValue = useRecoilValue(monsterName);

  const { Icon, tooltip } = (() => {
    if (isMonsterDeadValue) {
      return { Icon: IconCorpse, tooltip: "Dead monster" };
    }

    if (isBossValue) {
      return { Icon: IconBoss, tooltip: "Boss" };
    }

    if (isAttackingValue) {
      return { Icon: IconAttacking, tooltip: "Monster" };
    }

    return { Icon: IconLurking, tooltip: "Lurking monster" };
  })();

  return <IconDisplay contents={monsterNameValue} Icon={Icon} tooltip={tooltip} />;
}
