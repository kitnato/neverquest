import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterDamagePerSecond } from "@neverquest/components/Monster/MonsterDamagePerSecond";
import IconMonsterDamage from "@neverquest/icons/monster-damage.svg?react";
import { monsterDamage, monsterDamageAiling } from "@neverquest/state/monster";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MonsterDamage() {
  const monsterDamageValue = useRecoilValue(monsterDamage);
  const monsterDamageAilingValue = useRecoilValue(monsterDamageAiling);

  return (
    <IconDisplay
      className={getAnimationClass({ name: "flipInX" })}
      description={<MonsterDamagePerSecond />}
      Icon={IconMonsterDamage}
      tooltip="Monster damage"
    >{`${formatNumber({ value: monsterDamageAilingValue })}${
      monsterDamageValue === monsterDamageAilingValue ? "" : ` (${monsterDamageValue})`
    }`}</IconDisplay>
  );
}
