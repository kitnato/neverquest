import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { ELEMENTAL_AILMENT_PENALTY } from "@neverquest/data/combat";
import { useDefend } from "@neverquest/hooks/actions/useDefend";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { isAttacking } from "@neverquest/state/character";
import {
  isMonsterAiling,
  isMonsterDead,
  monsterAttackDuration,
  monsterAttackRate,
} from "@neverquest/state/monster";

import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function MonsterAttackMeter() {
  const [monsterAttackDurationValue, setMonsterAttackDuration] =
    useRecoilState(monsterAttackDuration);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterFrozenValue = useRecoilValue(isMonsterAiling("frozen"));
  const isMonsterStaggeredValue = useRecoilValue(isMonsterAiling("staggered"));
  const monsterAttackRateValue = useRecoilValue(monsterAttackRate);

  const defend = useDefend();

  useAnimate({
    deltas: [setMonsterAttackDuration],
    stop: !isAttackingValue || isMonsterDeadValue || isMonsterStaggeredValue,
  });

  useEffect(() => {
    if (isAttackingValue && monsterAttackDurationValue === 0) {
      defend();
      setMonsterAttackDuration(monsterAttackRateValue);
    }
  }, [
    defend,
    isAttackingValue,
    monsterAttackDurationValue,
    monsterAttackRateValue,
    setMonsterAttackDuration,
  ]);

  useEffect(() => {
    if (isMonsterFrozenValue) {
      setMonsterAttackDuration((current) => current * ELEMENTAL_AILMENT_PENALTY.frozen);
    }
  }, [isMonsterFrozenValue, setMonsterAttackDuration]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(monsterAttackDurationValue || monsterAttackRateValue)}
      value={
        ((monsterAttackDurationValue === 0
          ? 0
          : monsterAttackRateValue - monsterAttackDurationValue) /
          monsterAttackRateValue) *
        100
      }
      variant="secondary"
    />
  );
}
