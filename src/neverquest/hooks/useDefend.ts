import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { isRecovering, statusElement } from "neverquest/state/character";
import { gameOver } from "neverquest/state/global";
import { deltaHealth, deltaStamina } from "neverquest/state/deltas";
import { shield } from "neverquest/state/inventory";
import { isMonsterStaggered, totalDamageMonster } from "neverquest/state/monster";
import { canBlock, currentHealth, currentStamina } from "neverquest/state/reserves";
import { showRecovery } from "neverquest/state/show";
import { totalBlockChance, totalProtection } from "neverquest/state/statistics";
import { DeltaDisplay, AnimationSpeed, AnimationType, FloatingTextType } from "neverquest/types/ui";
import { BLOCKED } from "neverquest/utilities/constants";
import { animateElement } from "neverquest/utilities/helpers";

export default function useDefend() {
  const [currentHealthValue, setCurrentHealth] = useAtom(currentHealth);
  const [showRecoveryValue, setShowRecovery] = useAtom(showRecovery);
  const setCurrentStamina = useSetAtom(currentStamina);
  const setDeltaHealth = useSetAtom(deltaHealth);
  const setDeltaStamina = useSetAtom(deltaStamina);
  const setGameOver = useSetAtom(gameOver);
  const setRecovering = useSetAtom(isRecovering);
  const setStaggered = useSetAtom(isMonsterStaggered);
  const canBlockValue = useAtomValue(canBlock);
  const { staminaCost } = useAtomValue(shield);
  const statusElementValue = useAtomValue(statusElement);
  const totalBlockChanceValue = useAtomValue(totalBlockChance);
  const totalProtectionValue = useAtomValue(totalProtection);
  const totalDamageMonsterValue = useAtomValue(totalDamageMonster);

  return () => {
    animateElement({
      element: statusElementValue,
      animation: AnimationType.HeadShake,
      speed: AnimationSpeed.Fast,
    });

    if (canBlockValue && Math.random() <= totalBlockChanceValue) {
      setDeltaHealth({
        color: FloatingTextType.Neutral,
        value: BLOCKED,
      });
      setCurrentStamina((current) => current - staminaCost);
      setDeltaStamina({
        color: FloatingTextType.Negative,
        value: `${-staminaCost}`,
      });
      setStaggered(true);

      return;
    }

    const healthDamage = (() => {
      const damage = totalProtectionValue - totalDamageMonsterValue;

      return damage < 0 ? damage : 0;
    })();
    let health = currentHealthValue + healthDamage;

    if (health <= 0) {
      health = 0;
    }

    if (health !== currentHealthValue) {
      let deltaContents: DeltaDisplay = {
        color: FloatingTextType.Negative,
        value: `${healthDamage}`,
      };

      if (totalProtectionValue > 0) {
        deltaContents = [
          deltaContents,
          {
            color: FloatingTextType.Neutral,
            value: ` (${totalProtectionValue})`,
          },
        ];
      }

      setDeltaHealth(deltaContents);
      setCurrentHealth(health);

      if (health === 0) {
        setGameOver(true);
      } else {
        if (!showRecoveryValue) {
          setShowRecovery(true);
        }

        setRecovering(true);
      }
    }
  };
}
