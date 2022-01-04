import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isRecovering } from "state/character";
import { gameOver, show } from "state/global";
import { totalDamageMonster } from "state/monster";
import { currentHealth, deltaHealth } from "state/resources";
import { totalArmor, totalPhysicalResistance } from "state/stats";
import { getFromRange } from "utilities/helpers";

export default function useDefend() {
  const [currentHealthValue, setCurrentHealth] = useRecoilState(currentHealth);
  const [showValue, setShow] = useRecoilState(show);
  const setDeltaHealth = useSetRecoilState(deltaHealth);
  const setGameOver = useSetRecoilState(gameOver);
  const setRecovering = useSetRecoilState(isRecovering);
  const totalArmorValue = useRecoilValue(totalArmor);
  const totalDamageMonsterValue = useRecoilValue(totalDamageMonster);
  const totalPhysicalResistanceValue = useRecoilValue(totalPhysicalResistance);

  return () => {
    const healthDamage = (() => {
      const damage = totalArmorValue - getFromRange(totalDamageMonsterValue);

      return damage < 0 ? damage : 0;
    })();
    let health = currentHealthValue + healthDamage;

    if (health <= 0) {
      health = 0;
    }

    if (health !== currentHealthValue) {
      setDeltaHealth(healthDamage);
      setCurrentHealth(health);

      if (health === 0) {
        setGameOver(true);
      } else {
        if (!showValue.recovery) {
          setShow({ ...showValue, recovery: true });
        }

        if (Math.abs(healthDamage) > totalPhysicalResistanceValue) {
          setRecovering(true);
        }
      }
    }
  };
}
