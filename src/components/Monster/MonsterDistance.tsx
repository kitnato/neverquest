import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterDistanceMeter } from "@neverquest/components/Monster/MonsterDistanceMeter";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import IconDistance from "@neverquest/icons/distance.svg?react";
import { isAttacking } from "@neverquest/state/character";
import { weapon } from "@neverquest/state/gear";
import {
  distance,
  hasMonsterClosed,
  isMonsterAiling,
  isMonsterDead,
} from "@neverquest/state/monster";
import { isRanged } from "@neverquest/types/type-guards";

export function MonsterDistance() {
  const hasMonsterClosedValue = useRecoilValue(hasMonsterClosed);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterFrozenValue = useRecoilValue(isMonsterAiling("frozen"));
  const isMonsterStaggered = useRecoilValue(isMonsterAiling("staggered"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const weaponValue = useRecoilValue(weapon);
  const setMonsterDistance = useSetRecoilState(distance);

  useAnimate({
    delta: setMonsterDistance,
    factor: isMonsterStaggered ? AILMENT_PENALTY.staggered : 1,
    stop: !isAttackingValue || isMonsterDeadValue || hasMonsterClosedValue || isMonsterFrozenValue,
  });

  if (!isRanged(weaponValue)) {
    return null;
  }

  return (
    <IconDisplay Icon={IconDistance} isAnimated tooltip="Distance">
      <MonsterDistanceMeter />
    </IconDisplay>
  );
}
