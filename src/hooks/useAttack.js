import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { isAttacking } from "state/character";
import { weapon } from "state/equipment";
import { currentHealthMonster, deltaHealthMonster } from "state/monster";
import { currentStamina, deltaStamina } from "state/resources";
import { totalDamage } from "state/stats";
import { getFromRange } from "utilities/helpers";

export default function useAttack() {
  const [currentHealthMonsterValue, setCurrentHealthMonster] =
    useRecoilState(currentHealthMonster);
  const [currentStaminaValue, setCurrentStamina] =
    useRecoilState(currentStamina);
  const setDeltaHealthMonster = useSetRecoilState(deltaHealthMonster);
  const setDeltaStamina = useSetRecoilState(deltaStamina);
  const setAttacking = useSetRecoilState(isAttacking);
  const totalDamageValue = useRecoilValue(totalDamage);
  const weaponValue = useRecoilValue(weapon);

  return () => {
    let stamina = currentStaminaValue - weaponValue.cost;

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

    setDeltaStamina(-weaponValue.cost);
    setCurrentStamina(stamina);
  };
}
