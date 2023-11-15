import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import IconBossAttacking from "@neverquest/icons/boss-attacking.svg?react";
import IconBossCorpse from "@neverquest/icons/boss-corpse.svg?react";
import IconBossLurking from "@neverquest/icons/boss-lurking.svg?react";
import IconAttacking from "@neverquest/icons/monster-attacking.svg?react";
import IconMonsterCorpse from "@neverquest/icons/monster-corpse.svg?react";
import IconLurking from "@neverquest/icons/monster-lurking.svg?react";
import IconResCogitans from "@neverquest/icons/res-cogitans.svg?react";
import IconResDominus from "@neverquest/icons/res-dominus.svg?react";
import { isAttacking } from "@neverquest/state/character";
import { finality, isBoss } from "@neverquest/state/encounter";
import { isMonsterDead, monsterName } from "@neverquest/state/monster";

export function MonsterName() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isBossValue = useRecoilValue(isBoss);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const finalityValue = useRecoilValue(finality);
  const monsterNameValue = useRecoilValue(monsterName);

  const { Icon, tooltip } = (() => {
    if (finalityValue !== false) {
      return {
        Icon: finalityValue === "res cogitans" ? IconResCogitans : IconResDominus,
        tooltip: LABEL_UNKNOWN,
      };
    }

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

  return (
    <IconDisplay Icon={Icon} tooltip={tooltip}>
      {monsterNameValue}
    </IconDisplay>
  );
}
