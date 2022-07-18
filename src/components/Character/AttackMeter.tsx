import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isAttacking, isLooting, isRecovering } from "@neverquest/state/character";
import { offense } from "@neverquest/state/combat";
import { isMonsterDead } from "@neverquest/state/monster";
import { canAttack } from "@neverquest/state/reserves";
import { totalAttackRate } from "@neverquest/state/statistics";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/helpers";

export default function AttackMeter() {
  const isAttackingValue = useAtomValue(isAttacking);
  const isLootingValue = useAtomValue(isLooting);
  const isMonsterDeadValue = useAtomValue(isMonsterDead);
  const isRecoveringValue = useAtomValue(isRecovering);
  const canAttackValue = useAtomValue(canAttack);
  const totalAttackRateValue = useAtomValue(totalAttackRate);
  const attack = useSetAtom(offense);
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

  return (
    <LabelledProgressBar
      disableTransitions
      label={canAttackValue ? formatMilliseconds(totalAttackRateValue - deltaAttack) : "EXHAUSTED"}
      value={(deltaAttack / totalAttackRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
