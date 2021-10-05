import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import { damageDealt } from "state/character";
import { level } from "state/global";

export default function MonsterHealthMeter({ onDeath }) {
  const levelValue = useRecoilValue(level);
  const [damageDealtValue, setDamageDealt] = useRecoilState(damageDealt);
  const [health, setHealth] = useState({
    current: levelValue + 5,
    max: levelValue + 5,
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
