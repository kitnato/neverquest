import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import LabelledProgressBar from "neverquest/components/LabelledProgressBar";
import useAnimation from "neverquest/hooks/useAnimation";
import useAttack from "neverquest/hooks/useAttack";
import { isAttacking, isLooting, isRecovering } from "neverquest/state/character";
import { isMonsterDead } from "neverquest/state/monster";
import { canAttack } from "neverquest/state/resources";
import { totalAttackRate } from "neverquest/state/statistics";
import { UIVariant } from "neverquest/types/ui";
import { formatMilliseconds } from "neverquest/utilities/helpers";

export default function AttackMeter() {
  const attack = useAttack();
  const isAttackingValue = useAtomValue(isAttacking);
  const isLootingValue = useAtomValue(isLooting);
  const isMonsterDeadValue = useAtomValue(isMonsterDead);
  const isRecoveringValue = useAtomValue(isRecovering);
  const canAttackValue = useAtomValue(canAttack);
  const totalAttackRateValue = useAtomValue(totalAttackRate);
  const [deltaAttack, setDeltaAttack] = useState(0);

  useAnimation((delta) => {
    setDeltaAttack((current) => current + delta);
  }, !isAttackingValue || isLootingValue || isRecoveringValue || !canAttackValue);

  useEffect(() => {
    if (deltaAttack >= totalAttackRateValue) {
      attack();
      setDeltaAttack(0);
    }
  }, [deltaAttack, totalAttackRateValue]);

  useEffect(() => {
    if (!isAttackingValue || isLootingValue || isMonsterDeadValue || !canAttackValue) {
      setDeltaAttack(0);
    }
  }, [isAttackingValue, isLootingValue, isMonsterDeadValue, canAttackValue]);

  const label = (() => {
    if (isLootingValue) {
      return "LOOTING";
    }

    if (!canAttackValue) {
      return "EXHAUSTED";
    }

    return formatMilliseconds(totalAttackRateValue - deltaAttack);
  })();

  return (
    <LabelledProgressBar
      disableTransitions
      label={label}
      value={(deltaAttack / totalAttackRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
