import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconBossAttacking } from "@neverquest/icons/boss-attacking.svg";
import { ReactComponent as IconBossCorpse } from "@neverquest/icons/boss-corpse.svg";
import { ReactComponent as IconBossLurking } from "@neverquest/icons/boss-lurking.svg";
import { ReactComponent as IconAttacking } from "@neverquest/icons/monster-attacking.svg";
import { ReactComponent as IconMonsterCorpse } from "@neverquest/icons/monster-corpse.svg";
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
      return {
        Icon: isBossValue ? IconBossCorpse : IconMonsterCorpse,
        tooltip: `Dead ${isBossValue ? "boss" : "monster"}`,
      };
    }

    if (isAttackingValue) {
      return {
        Icon: isBossValue ? IconBossAttacking : IconAttacking,
        tooltip: isBossValue ? "Boss" : "Monster",
      };
    }

    return {
      Icon: isBossValue ? IconBossLurking : IconLurking,
      tooltip: `Lurking ${isBossValue ? "boss" : "monster"}`,
    };
  })();

  return <IconDisplay contents={monsterNameValue} Icon={Icon} tooltip={tooltip} />;
}
