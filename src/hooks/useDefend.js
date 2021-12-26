import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isRecovering } from "state/character";
import { gameOver } from "state/global";
import { totalDamageMonster } from "state/monster";
import { currentHealth } from "state/resources";
import { totalArmor, totalPhysicalResistance } from "state/stats";
import { getFromRange } from "utilities/helpers";

export default function useDefend() {
  const [currentHealthValue, setCurrentHealth] = useRecoilState(currentHealth);
  const totalArmorValue = useRecoilValue(totalArmor);
  const totalPhysicalResistanceValue = useRecoilValue(totalPhysicalResistance);
  const totalDamageMonsterValue = useRecoilValue(totalDamageMonster);

  const setGameOver = useSetRecoilState(gameOver);
  const setRecovering = useSetRecoilState(isRecovering);

  return () => {
    const healthDamage =
      totalArmorValue - getFromRange(totalDamageMonsterValue);
    let health = currentHealthValue + (healthDamage < 0 ? healthDamage : 0);

    if (health <= 0) {
      health = 0;
      setGameOver(true);
    }

    if (health !== currentHealthValue) {
      setCurrentHealth(health);

      if (Math.abs(healthDamage) > totalPhysicalResistanceValue) {
        setRecovering(true);
      }
    }
  };
}
