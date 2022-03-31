import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import Progress from "neverquest/components/Progress";
import { UIVariant } from "neverquest/env.d";
import useAnimation from "neverquest/hooks/useAnimation";
import useAttack from "neverquest/hooks/useAttack";
import { isAttacking, isRecovering } from "neverquest/state/character";
import { isMonsterDead } from "neverquest/state/monster";
import { isStaminaSufficient } from "neverquest/state/resources";
import { totalAttackRate } from "neverquest/state/stats";
import formatCountdown from "neverquest/utilities/formatCountdown";

export default function AttackMeter() {
  const attack = useAttack();
  const totalAttackRateValue = useRecoilValue(totalAttackRate);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isStaminaSufficientValue = useRecoilValue(isStaminaSufficient);
  const [deltaAttack, setDeltaAttack] = useState(0);

  useEffect(() => {
    if (deltaAttack >= totalAttackRateValue && !isMonsterDeadValue) {
      attack();
      setDeltaAttack(0);
    }
  }, [attack, deltaAttack, isMonsterDeadValue, totalAttackRateValue]);

  useAnimation((deltaTime) => {
    setDeltaAttack((currentDelta) => currentDelta + deltaTime);
  }, !isAttackingValue || isRecoveringValue || !isStaminaSufficientValue);

  useEffect(() => {
    if (!isAttackingValue || isMonsterDeadValue) {
      setDeltaAttack(0);
    }
  }, [isAttackingValue, isMonsterDeadValue]);

  return (
    <Progress
      label={
        isStaminaSufficientValue ? formatCountdown(totalAttackRateValue - deltaAttack) : "EXHAUSTED"
      }
      value={(deltaAttack / totalAttackRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
