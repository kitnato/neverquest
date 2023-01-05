import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useAttack from "@neverquest/hooks/actions/useAttack";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isAttacking, isLooting, isRecovering } from "@neverquest/state/character";
import { isMonsterDead } from "@neverquest/state/monster";
import { canAttackOrParry } from "@neverquest/state/reserves";
import { attackRate } from "@neverquest/state/statistics";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function () {
  const attackRateValue = useRecoilValue(attackRate);
  const canAttackOrParryValue = useRecoilValue(canAttackOrParry);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isLootingValue = useRecoilValue(isLooting);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isRecoveringValue = useRecoilValue(isRecovering);

  const [deltaAttack, setDeltaAttack] = useState(0);

  const attack = useAttack();

  useEffect(() => {
    if (deltaAttack >= attackRateValue) {
      attack();
      setDeltaAttack(0);
    }
  }, [attack, deltaAttack, attackRateValue]);

  useEffect(() => {
    if (!canAttackOrParryValue || !isAttackingValue || isLootingValue || isMonsterDeadValue) {
      setDeltaAttack(0);
    }
  }, [canAttackOrParryValue, isAttackingValue, isLootingValue, isMonsterDeadValue]);

  useAnimation(
    (delta) => setDeltaAttack((current) => current + delta),
    !canAttackOrParryValue || !isAttackingValue || isLootingValue || isRecoveringValue
  );

  return (
    <LabelledProgressBar
      disableTransitions
      label={
        canAttackOrParryValue ? formatMilliseconds(attackRateValue - deltaAttack) : "EXHAUSTED"
      }
      value={(deltaAttack / attackRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
