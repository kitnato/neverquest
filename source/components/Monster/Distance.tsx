import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DistanceMeter } from "@neverquest/components/Monster/DistanceMeter";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
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
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Distance() {
  const hasMonsterClosedValue = useRecoilValue(hasMonsterClosed);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterFrozen = useRecoilValue(isMonsterAiling("frozen"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const weaponValue = useRecoilValue(weapon);
  const setMonsterDistance = useSetRecoilState(distance);

  useTimerDelta({
    delta: setMonsterDistance,
    factor: isMonsterFrozen ? AILMENT_PENALTY.frozen : 1,
    stop: !isAttackingValue || isMonsterDeadValue || hasMonsterClosedValue,
  });

  if (isRanged(weaponValue)) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconDistance}
        tooltip="Distance"
      >
        <DistanceMeter />
      </IconDisplay>
    );
  }
}