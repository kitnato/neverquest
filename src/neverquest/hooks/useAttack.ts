import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { isAttacking } from "neverquest/state/character";
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
  const setAttacking = useSetRecoilState(isAttacking);
  const totalDamageValue = useRecoilValue(totalDamage);
  const weaponValue = useRecoilValue(weapon);

  return () => {
    let stamina = currentStaminaValue - weaponValue.staminaCost;

    if (stamina >= 0) {
      const damage = getFromRange(totalDamageValue);
      let monsterHealth = currentHealthMonsterValue - damage;

      if (monsterHealth < 0) {
        monsterHealth = 0;
      }

      setDeltaHealthMonster(-damage);
      setCurrentHealthMonster(monsterHealth);
    }

    if (stamina < 0) {
      stamina = 0;
      setAttacking(false);
    }

    setDeltaStamina(-weaponValue.staminaCost);
    setCurrentStamina(stamina);
  };
}
