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
import { encounter } from "@neverquest/state/encounter";
import { isMonsterDead, monsterName } from "@neverquest/state/monster";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function MonsterName() {
  const encounterValue = useRecoilValue(encounter);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const monsterNameValue = useRecoilValue(monsterName);

  const { Icon, tooltip } = (() => {
    switch (encounterValue) {
      case "boss":
      case "monster": {
        if (isMonsterDeadValue) {
          return {
            Icon: encounterValue === "boss" ? IconBossCorpse : IconMonsterCorpse,
            tooltip: `Dead ${encounterValue}`,
          };
        }

        if (isAttackingValue) {
          return {
            Icon: encounterValue === "boss" ? IconBossAttacking : IconAttacking,
            tooltip: capitalizeAll(encounterValue),
          };
        }

        return {
          Icon: encounterValue === "boss" ? IconBossLurking : IconLurking,
          tooltip: `Lurking ${encounterValue}`,
        };
      }

      default: {
        return {
          Icon: encounterValue === "res cogitans" ? IconResCogitans : IconResDominus,
          tooltip: LABEL_UNKNOWN,
        };
      }
    }
  })();

  return (
    <IconDisplay Icon={Icon} tooltip={tooltip}>
      {monsterNameValue}
    </IconDisplay>
  );
}
