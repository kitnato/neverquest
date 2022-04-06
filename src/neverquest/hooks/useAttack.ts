import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { weapon } from "neverquest/state/equipment";
import { currentHealthMonster, deltaHealthMonster } from "neverquest/state/monster";
import { currentStamina, deltaStamina } from "neverquest/state/resources";
import { totalDamage } from "neverquest/state/stats";

export default function useAttack() {
  const [currentHealthMonsterValue, setCurrentHealthMonster] = useRecoilState(currentHealthMonster);
  const [currentStaminaValue, setCurrentStamina] = useRecoilState(currentStamina);
  const setDeltaHealthMonster = useSetRecoilState(deltaHealthMonster);
  const setDeltaStamina = useSetRecoilState(deltaStamina);
  const totalDamageValue = useRecoilValue(totalDamage);
  const weaponValue = useRecoilValue(weapon);

  return () => {
    const stamina = currentStaminaValue - weaponValue.staminaCost;

    if (stamina >= 0) {
      let monsterHealth = currentHealthMonsterValue - totalDamageValue;

      if (monsterHealth < 0) {
        monsterHealth = 0;
      }

      setDeltaStamina(-weaponValue.staminaCost);
      setCurrentStamina(stamina);

      setDeltaHealthMonster(-totalDamageValue);
      setCurrentHealthMonster(monsterHealth);
    }

    if (stamina < 0) {
      return false;
    }

    return true;
  };
}
