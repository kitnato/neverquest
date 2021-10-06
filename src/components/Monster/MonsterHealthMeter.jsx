import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import { damageDealt } from "state/character";
import { level } from "state/global";
import { getFromRange } from "utilities/helpers";

export default function MonsterHealthMeter({ onDeath }) {
  const levelValue = useRecoilValue(level);
  const [damageDealtValue, setDamageDealt] = useRecoilState(damageDealt);
  const startingHealth =
    levelValue +
    1 +
    2 * getFromRange({ min: levelValue + 1, max: (levelValue + 1) * 2 });
  const [health, setHealth] = useState({
    current: startingHealth,
    max: startingHealth,
  });

  useEffect(() => {
    if (damageDealtValue !== null) {
      setHealth((currentHealth) => {
        let newHealth = currentHealth.current - damageDealtValue;

        if (newHealth < 0) {
          newHealth = 0;
        }

        return { ...currentHealth, current: newHealth };
      });
      setDamageDealt(null);
    }
  }, [damageDealtValue, setDamageDealt]);

  useEffect(() => {
    if (health.current === 0) {
      onDeath();
    }
  }, [health, onDeath]);

  return (
    <Progress
      label={`${health.current}/${health.max}`}
      value={(health.current / health.max) * 100}
      variant="secondary"
    />
  );
}
