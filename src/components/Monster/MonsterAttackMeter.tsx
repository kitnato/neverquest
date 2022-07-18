import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isAttacking } from "@neverquest/state/character";
import { defense } from "@neverquest/state/combat";
import {
  currentHealthMonster,
  isMonsterDead,
  isMonsterEngaged,
  isMonsterStaggered,
  totalAttackRateMonster,
} from "@neverquest/state/monster";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/helpers";

export default function MonsterAttackMeter() {
  const isAttackingValue = useAtomValue(isAttacking);
  const isMonsterDeadValue = useAtomValue(isMonsterDead);
  const isMonsterEngagedValue = useAtomValue(isMonsterEngaged);
  const isMonsterStaggeredValue = useAtomValue(isMonsterStaggered);
  const totalAttackRateMonsterValue = useAtomValue(totalAttackRateMonster);
  const resetCurrentHealthMonster = useResetAtom(currentHealthMonster);
  const defend = useSetAtom(defense);

  const [deltaAttack, setDeltaAttack] = useState(0);

  useAnimation((delta) => {
    setDeltaAttack((current) => current + delta);
  }, !isAttackingValue || isMonsterDeadValue || !isMonsterEngagedValue || isMonsterStaggeredValue);

  useEffect(() => {
    if (!isMonsterDeadValue && deltaAttack >= totalAttackRateMonsterValue) {
      setDeltaAttack(0);
      defend();
    }
  }, [deltaAttack, isMonsterDeadValue, totalAttackRateMonsterValue]);

  useEffect(() => {
    if (!isAttackingValue && !isMonsterDeadValue) {
      setDeltaAttack(0);
      resetCurrentHealthMonster();
    }
  }, [isAttackingValue, isMonsterDeadValue]);

  useEffect(() => {
    if (isMonsterDeadValue) {
      setDeltaAttack(0);
    }
  }, [isMonsterDeadValue]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(totalAttackRateMonsterValue - deltaAttack)}
      value={(deltaAttack / totalAttackRateMonsterValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}