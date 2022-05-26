import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { weapon } from "neverquest/state/inventory";
import { deltaHealthMonster, deltaStamina } from "neverquest/state/deltas";
import { currentHealthMonster, monsterStatusElement } from "neverquest/state/monster";
import { canAttack, currentStamina } from "neverquest/state/reserves";
import { totalDamage } from "neverquest/state/statistics";
import { AnimationSpeed, AnimationType, FloatingTextType } from "neverquest/types/ui";
import { animateElement } from "neverquest/utilities/helpers";

export default function useAttack() {
  const [currentHealthMonsterValue, setCurrentHealthMonster] = useAtom(currentHealthMonster);
  const setCurrentStamina = useSetAtom(currentStamina);
  const setDeltaHealthMonster = useSetAtom(deltaHealthMonster);
  const setDeltaStamina = useSetAtom(deltaStamina);
  const canAttackValue = useAtomValue(canAttack);
  const monsterStatusElementValue = useAtomValue(monsterStatusElement);
  const totalDamageValue = useAtomValue(totalDamage);
  const { staminaCost } = useAtomValue(weapon);

  return () => {
    if (canAttackValue) {
      let monsterHealth = currentHealthMonsterValue - totalDamageValue;

      if (monsterHealth < 0) {
        monsterHealth = 0;
      }

      setCurrentStamina((current) => current - staminaCost);
      setDeltaStamina({
        color: FloatingTextType.Negative,
        value: `${-staminaCost}`,
      });

      setCurrentHealthMonster(monsterHealth);
      setDeltaHealthMonster({
        color: FloatingTextType.Negative,
        value: `${-totalDamageValue}`,
      });

      animateElement({
        element: monsterStatusElementValue,
        animation: AnimationType.HeadShake,
        speed: AnimationSpeed.Fast,
      });

      return true;
    }

    return false;
  };
}
