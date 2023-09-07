import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAttackMeter } from "@neverquest/components/Monster/MonsterAttackMeter";
import { ELEMENTAL_AILMENT_PENALTY } from "@neverquest/data/statistics";
import { useDefend } from "@neverquest/hooks/actions/useDefend";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { ReactComponent as IconAttackRate } from "@neverquest/icons/attack-rate.svg";
import { isAttacking } from "@neverquest/state/character";
import { isMonsterAiling, isMonsterDead, monsterAttackDuration } from "@neverquest/state/monster";

export function MonsterAttack() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterFrozenValue = useRecoilValue(isMonsterAiling("frozen"));
  const isMonsterStaggeredValue = useRecoilValue(isMonsterAiling("staggered"));
  const setMonsterAttackDuration = useSetRecoilState(monsterAttackDuration);

  const defend = useDefend();

  useAnimate({
    delta: setMonsterAttackDuration,
    factor: isMonsterFrozenValue ? ELEMENTAL_AILMENT_PENALTY.frozen : 1,
    onDelta: defend,
    stop: !isAttackingValue || isMonsterDeadValue || isMonsterStaggeredValue,
  });

  return (
    <IconDisplay
      contents={<MonsterAttackMeter />}
      Icon={IconAttackRate}
      tooltip="Monster attack rate"
    />
  );
}
