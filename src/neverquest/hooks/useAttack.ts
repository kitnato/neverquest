import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { weapon } from "neverquest/state/equipment";
import { currentHealthMonster, deltaHealthMonster } from "neverquest/state/monster";
import { currentStamina, deltaStamina } from "neverquest/state/resources";
import { totalDamage } from "neverquest/state/stats";
import { getFromRange } from "neverquest/utilities/helpers";

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
      const damage = getFromRange(totalDamageValue);
      let monsterHealth = currentHealthMonsterValue - damage;

      if (monsterHealth < 0) {
        monsterHealth = 0;
      }

      setDeltaStamina(-weaponValue.staminaCost);
      setCurrentStamina(stamina);

      setDeltaHealthMonster(-damage);
      setCurrentHealthMonster(monsterHealth);
    }

    if (stamina < 0) {
      return false;
    }

    return true;
  };
}
