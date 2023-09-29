import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAttackMeter } from "@neverquest/components/Monster/MonsterAttackMeter";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import { useDefend } from "@neverquest/hooks/actions/useDefend";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { ReactComponent as IconAttackRate } from "@neverquest/icons/attack-rate.svg";
import { isAttacking } from "@neverquest/state/character";
import {
  hasMonsterClosed,
  isMonsterAiling,
  isMonsterDead,
  monsterAttackDuration,
} from "@neverquest/state/monster";

export function MonsterAttack() {
  const hasMonsterClosedValue = useRecoilValue(hasMonsterClosed);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterFrozenValue = useRecoilValue(isMonsterAiling("frozen"));
  const isMonsterStaggeredValue = useRecoilValue(isMonsterAiling("staggered"));
  const setMonsterAttackDuration = useSetRecoilState(monsterAttackDuration);

  const defend = useDefend();

  useAnimate({
    delta: setMonsterAttackDuration,
    factor: isMonsterFrozenValue ? AILMENT_PENALTY.frozen : 1,
    onDelta: defend,
    stop:
      !isAttackingValue || !hasMonsterClosedValue || isMonsterDeadValue || isMonsterStaggeredValue,
  });

  return (
    <IconDisplay
      contents={<MonsterAttackMeter />}
      Icon={IconAttackRate}
      tooltip="Monster attack rate"
    />
  );
}
