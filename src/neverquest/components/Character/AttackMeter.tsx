import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import Progress from "neverquest/components/Progress";
import { UIVariant } from "neverquest/env";
import useAnimation from "neverquest/hooks/useAnimation";
import useAttack from "neverquest/hooks/useAttack";
import { isAttacking, isLooting, isRecovering } from "neverquest/state/character";
import { isMonsterDead } from "neverquest/state/monster";
import { canAttack } from "neverquest/state/resources";
import { totalAttackRate } from "neverquest/state/statistics";
import { formatMilliseconds } from "neverquest/utilities/helpers";

export default function AttackMeter() {
  const attack = useAttack();
  const isAttackingValue = useRecoilValue(isAttacking);
  const isLootingValue = useRecoilValue(isLooting);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isRecoveringValue = useRecoilValue(isRecovering);
  const canAttackValue = useRecoilValue(canAttack);
  const totalAttackRateValue = useRecoilValue(totalAttackRate);
  const [deltaAttack, setDeltaAttack] = useState(0);

  useAnimation((deltaTime) => {
    setDeltaAttack((currentDelta) => currentDelta + deltaTime);
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
    <Progress
      disableTransitions
      label={label}
      value={(deltaAttack / totalAttackRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
