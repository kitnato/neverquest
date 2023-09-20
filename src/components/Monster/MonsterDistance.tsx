import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterDistanceMeter } from "@neverquest/components/Monster/MonsterDistanceMeter";
import { ELEMENTAL_AILMENT_PENALTY } from "@neverquest/data/statistics";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { ReactComponent as IconDistance } from "@neverquest/icons/distance.svg";
import { isAttacking } from "@neverquest/state/character";
import { weapon } from "@neverquest/state/items";
import {
  hasMonsterClosed,
  isMonsterAiling,
  isMonsterDead,
  monsterDistance,
} from "@neverquest/state/monster";
import { isRanged } from "@neverquest/types/type-guards";

export function MonsterDistance() {
  const hasMonsterClosedValue = useRecoilValue(hasMonsterClosed);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterFrozenValue = useRecoilValue(isMonsterAiling("frozen"));
  const isMonsterStaggeredValue = useRecoilValue(isMonsterAiling("staggered"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const weaponValue = useRecoilValue(weapon);
  const setMonsterDistance = useSetRecoilState(monsterDistance);

  useAnimate({
    delta: setMonsterDistance,
    factor: isMonsterFrozenValue ? ELEMENTAL_AILMENT_PENALTY.frozen : 1,
    stop:
      !isAttackingValue || isMonsterDeadValue || isMonsterStaggeredValue || hasMonsterClosedValue,
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
