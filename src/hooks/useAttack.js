import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import useKill from "hooks/useKill";
import { isAttacking } from "state/character";
import { weapon } from "state/equipment";
import { currentHealthMonster } from "state/monster";
import { currentStamina } from "state/resources";
import { totalDamage } from "state/stats";
import { getFromRange } from "utilities/helpers";

export default function useAttack() {
  const [currentHealthMonsterValue, setCurrentHealthMonster] =
    useRecoilState(currentHealthMonster);
  const [currentStaminaValue, setCurrentStamina] =
    useRecoilState(currentStamina);
  const kill = useKill();
  const setAttacking = useSetRecoilState(isAttacking);
  const totalDamageValue = useRecoilValue(totalDamage);
  const weaponValue = useRecoilValue(weapon);

  return () => {
    let stamina = currentStaminaValue - weaponValue.cost;

    if (stamina >= 0) {
      let monsterHealth =
        currentHealthMonsterValue - getFromRange(totalDamageValue);

      if (monsterHealth < 0) {
        monsterHealth = 0;
      }

      setCurrentHealthMonster(monsterHealth);

      if (monsterHealth === 0) {
        kill();
      }
    }

    if (stamina < 0) {
      stamina = 0;
      setAttacking(false);
    }

    setCurrentStamina(stamina);
  };
}
