import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterDistanceMeter } from "@neverquest/components/Monster/MonsterDistanceMeter";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { ReactComponent as IconDistance } from "@neverquest/icons/distance.svg";
import { isAttacking } from "@neverquest/state/character";
import { weapon } from "@neverquest/state/inventory";
import { hasMonsterClosed, isMonsterDead, monsterDistance } from "@neverquest/state/monster";
import { isRanged } from "@neverquest/types/type-guards";

export function MonsterDistance() {
  const hasMonsterClosedValue = useRecoilValue(hasMonsterClosed);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const weaponValue = useRecoilValue(weapon);
  const setMonsterDistance = useSetRecoilState(monsterDistance);

  useAnimate({
    delta: setMonsterDistance,
    stop: !isAttackingValue || isMonsterDeadValue || hasMonsterClosedValue,
  });

  if (!isRanged(weaponValue)) {
    return null;
  }

  return (
    <IconDisplay
      contents={<MonsterDistanceMeter />}
      Icon={IconDistance}
      isAnimated
      tooltip="Distance"
    />
  );
}
