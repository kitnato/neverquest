import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { damageDealt, isAttacking, isRecovering } from "state/character";
import { weapon } from "state/equipment";
import { gameOver } from "state/global";
import { currentStamina, currentHealth, maxStamina } from "state/resources";
import { totalArmor, totalDamage, totalPhysicalResistance } from "state/stats";
import { getFromRange } from "utilities/helpers";

export default function useCombat() {
  const [currentHealthValue, setCurrentHealth] = useRecoilState(currentHealth);
  const [currentStaminaValue, setCurrentStamina] =
    useRecoilState(currentStamina);

  const dphValue = useRecoilValue(totalDamage);
  const maxStaminaValue = useRecoilValue(maxStamina);
  const totalArmorValue = useRecoilValue(totalArmor);
  const totalPhysicalResistanceValue = useRecoilValue(totalPhysicalResistance);
  const weaponValue = useRecoilValue(weapon);

  const setAttacking = useSetRecoilState(isAttacking);
  const setDamageDealt = useSetRecoilState(damageDealt);
  const setGameOver = useSetRecoilState(gameOver);
  const setRecovering = useSetRecoilState(isRecovering);

  const attack = () => {
    let newStamina = currentStaminaValue - weaponValue.cost;

    if (newStamina >= 0) {
      setDamageDealt(getFromRange(dphValue));
    }

    if (newStamina < 0) {
      newStamina = 0;
      setAttacking(false);
    }

    if (newStamina > maxStaminaValue) {
      newStamina = maxStaminaValue;
    }

    setCurrentStamina(newStamina);
  };
  const defend = (incomingDamage) => {
    const healthDamage = Math.abs(totalArmorValue - incomingDamage);
    let newHealth = currentHealthValue - healthDamage;

    if (newHealth <= 0) {
      newHealth = 0;
      setGameOver(true);
    }

    if (healthDamage > totalPhysicalResistanceValue) {
      setRecovering(true);
    }

    setCurrentHealth(newHealth);
  };

  return { attack, defend };
}
