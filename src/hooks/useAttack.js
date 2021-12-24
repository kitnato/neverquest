import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isAttacking } from "state/character";
import { weapon } from "state/equipment";
import { currentHealthMonster, monsterDeath } from "state/monster";
import { currentStamina } from "state/resources";
import { totalDamage } from "state/stats";
import { getFromRange } from "utilities/helpers";

export default function useAttack() {
  const [currentStaminaValue, setCurrentStamina] =
    useRecoilState(currentStamina);
  const [currentHealthMonsterValue, setCurrentHealthMonster] =
    useRecoilState(currentHealthMonster);

  const totalDamageValue = useRecoilValue(totalDamage);
  const weaponValue = useRecoilValue(weapon);

  const setAttacking = useSetRecoilState(isAttacking);
  const setMonsterDeath = useSetRecoilState(monsterDeath);

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
        setMonsterDeath();
      }
    }

    if (stamina < 0) {
      stamina = 0;
      setAttacking(false);
    }

    setCurrentStamina(stamina);
  };
}
