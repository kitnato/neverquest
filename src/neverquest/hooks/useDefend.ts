import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { UIFloatingTextType } from "neverquest/env";
import { isRecovering } from "neverquest/state/character";
import { gameOver } from "neverquest/state/global";
import { deltaHealth } from "neverquest/state/deltas";
import { totalDamageMonster } from "neverquest/state/monster";
import { currentHealth } from "neverquest/state/resources";
import { showRecovery } from "neverquest/state/show";
import { totalProtection, totalPhysicalResistance } from "neverquest/state/stats";

export default function useDefend() {
  const [currentHealthValue, setCurrentHealth] = useRecoilState(currentHealth);
  const [showRecoveryValue, setShowRecovery] = useRecoilState(showRecovery);
  const setDeltaHealth = useSetRecoilState(deltaHealth);
  const setGameOver = useSetRecoilState(gameOver);
  const setRecovering = useSetRecoilState(isRecovering);
  const totalProtectionValue = useRecoilValue(totalProtection);
  const totalDamageMonsterValue = useRecoilValue(totalDamageMonster);
  const totalPhysicalResistanceValue = useRecoilValue(totalPhysicalResistance);

  return () => {
    const healthDamage = (() => {
      const damage = totalProtectionValue - totalDamageMonsterValue;

      return damage < 0 ? damage : 0;
    })();
    let health = currentHealthValue + healthDamage;

    if (health <= 0) {
      health = 0;
    }

    if (health !== currentHealthValue) {
      setDeltaHealth({
        color: UIFloatingTextType.Negative,
        value: `${healthDamage}`,
      });
      setCurrentHealth(health);

      if (health === 0) {
        setGameOver(true);
      } else {
        if (!showRecoveryValue) {
          setShowRecovery(true);
        }

        if (Math.abs(healthDamage) > totalPhysicalResistanceValue) {
          setRecovering(true);
        }
      }
    }
  };
}
