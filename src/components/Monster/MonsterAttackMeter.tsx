import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDefend } from "@neverquest/hooks/actions/useDefend";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { isAttacking } from "@neverquest/state/character";
import {
  isMonsterDead,
  isMonsterStaggered,
  monsterAttackDuration,
  monsterAttackRate,
} from "@neverquest/state/monster";

import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function MonsterAttackMeter() {
  const [monsterAttackDurationValue, setMonsterAttackDuration] =
    useRecoilState(monsterAttackDuration);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterStaggeredValue = useRecoilValue(isMonsterStaggered);
  const monsterAttackRateValue = useRecoilValue(monsterAttackRate);

  const defend = useDefend();

  useAnimation(
    (delta) => {
      const value = monsterAttackDurationValue - delta;

      if (value <= 0) {
        defend();

        setMonsterAttackDuration(monsterAttackRateValue);
      } else {
        setMonsterAttackDuration(value);
      }
    },
    !isAttackingValue || isMonsterDeadValue || isMonsterStaggeredValue,
  );

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
