import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterDamagePerSecond } from "@neverquest/components/Monster/MonsterDamagePerSecond";
import IconMonsterDamage from "@neverquest/icons/monster-damage.svg?react";
import { monsterDamage, monsterDamageAiling } from "@neverquest/state/monster";
import { formatNumber } from "@neverquest/utilities/formatters";

export function MonsterDamage() {
  const monsterDamageValue = useRecoilValue(monsterDamage);
  const monsterDamageAilingValue = useRecoilValue(monsterDamageAiling);

  return (
    <IconDisplay
      description={<MonsterDamagePerSecond />}
      Icon={IconMonsterDamage}
      isAnimated
      tooltip="Monster damage"
    >{`${formatNumber({ value: monsterDamageAilingValue })}${
      monsterDamageValue === monsterDamageAilingValue ? "" : ` (${monsterDamageValue})`
    }`}</IconDisplay>
  );
}
