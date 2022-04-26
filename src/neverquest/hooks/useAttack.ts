import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { UIFloatingTextType } from "neverquest/env";
import { weapon } from "neverquest/state/inventory";
import { deltaHealthMonster, deltaStamina } from "neverquest/state/deltas";
import { currentHealthMonster, monsterStatusElement } from "neverquest/state/monster";
import { currentStamina } from "neverquest/state/resources";
import { totalDamage } from "neverquest/state/stats";
import { animateElement } from "neverquest/utilities/helpers";

export default function useAttack() {
  const [currentHealthMonsterValue, setCurrentHealthMonster] = useRecoilState(currentHealthMonster);
  const [currentStaminaValue, setCurrentStamina] = useRecoilState(currentStamina);
  const setDeltaHealthMonster = useSetRecoilState(deltaHealthMonster);
  const setDeltaStamina = useSetRecoilState(deltaStamina);
  const monsterStatusElementValue = useRecoilValue(monsterStatusElement);
  const totalDamageValue = useRecoilValue(totalDamage);
  const weaponValue = useRecoilValue(weapon);

  return () => {
    const stamina = currentStaminaValue - weaponValue.staminaCost;

    if (stamina >= 0) {
      let monsterHealth = currentHealthMonsterValue - totalDamageValue;

      if (monsterHealth < 0) {
        monsterHealth = 0;
      }

      setDeltaStamina({
        color: UIFloatingTextType.Negative,
        value: `${-weaponValue.staminaCost}`,
      });
      setCurrentStamina(stamina);

      setDeltaHealthMonster({
        color: UIFloatingTextType.Negative,
        value: `${-totalDamageValue}`,
      });
      setCurrentHealthMonster(monsterHealth);

      animateElement(monsterStatusElementValue, "headShake", "fast");

      return true;
    }

    return false;
  };
}
