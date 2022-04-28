import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  DeltaDisplay,
  UIAnimationSpeed,
  UIAnimationType,
  UIFloatingTextType,
} from "neverquest/env";
import { isRecovering, statusElement } from "neverquest/state/character";
import { gameOver } from "neverquest/state/global";
import { deltaHealth, deltaStamina } from "neverquest/state/deltas";
import { shield } from "neverquest/state/inventory";
import { totalDamageMonster } from "neverquest/state/monster";
import { canBlock, currentHealth, currentStamina } from "neverquest/state/resources";
import { showRecovery } from "neverquest/state/show";
import {
  totalBlockChance,
  totalProtection,
  totalPhysicalResistance,
} from "neverquest/state/statistics";
import { BLOCKED } from "neverquest/utilities/constants";
import { animateElement } from "neverquest/utilities/helpers";

export default function useDefend() {
  const [currentHealthValue, setCurrentHealth] = useRecoilState(currentHealth);
  const [showRecoveryValue, setShowRecovery] = useRecoilState(showRecovery);
  const setCurrentStamina = useSetRecoilState(currentStamina);
  const setDeltaHealth = useSetRecoilState(deltaHealth);
  const setDeltaStamina = useSetRecoilState(deltaStamina);
  const setGameOver = useSetRecoilState(gameOver);
  const setRecovering = useSetRecoilState(isRecovering);
  const canBlockValue = useRecoilValue(canBlock);
  const { staminaCost } = useRecoilValue(shield);
  const statusElementValue = useRecoilValue(statusElement);
  const totalBlockChanceValue = useRecoilValue(totalBlockChance);
  const totalProtectionValue = useRecoilValue(totalProtection);
  const totalDamageMonsterValue = useRecoilValue(totalDamageMonster);
  const totalPhysicalResistanceValue = useRecoilValue(totalPhysicalResistance);

  return () => {
    animateElement(statusElementValue, UIAnimationType.HeadShake, UIAnimationSpeed.Fast);

    if (canBlockValue && Math.random() <= totalBlockChanceValue) {
      setDeltaHealth({
        color: UIFloatingTextType.Neutral,
        value: BLOCKED,
      });
      setCurrentStamina((currentStamina) => currentStamina - staminaCost);
      setDeltaStamina({
        color: UIFloatingTextType.Negative,
        value: `${-staminaCost}`,
      });

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
        color: UIFloatingTextType.Negative,
        value: `${healthDamage}`,
      };

      if (totalProtectionValue > 0) {
        deltaContents = [
          deltaContents,
          {
            color: UIFloatingTextType.Neutral,
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

        if (Math.abs(healthDamage) > totalPhysicalResistanceValue) {
          setRecovering(true);
        }
      }
    }
  };
}
