import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import { damageDealt } from "state/character";
import { level } from "state/global";

import healthIcon from "icons/hospital-cross.svg";

export default function MonsterHealth({ onDeath }) {
  const levelValue = useRecoilValue(level);
  const [damageDealtValue, setDamageDealt] = useRecoilState(damageDealt);
  const [health, setHealth] = useState({
    current: levelValue + 4,
    max: levelValue + 4,
  });
  const isDead = health.current === 0;

  useEffect(() => {
    if (damageDealtValue !== null) {
      setHealth((h) => {
        let newHealth = h.current - damageDealtValue;

        if (newHealth < 0) {
          newHealth = 0;
        }

        return { ...h, current: newHealth };
      });
      setDamageDealt(null);
    }
  }, [damageDealtValue, setDamageDealt]);

  useEffect(() => {
    if (isDead) {
      onDeath();
    }
  }, [isDead, onDeath]);

  return (
    <WithIcon icon={healthIcon} alt="Monster health">
      <Progress
        label={isDead ? "Dead" : `${health.current}/${health.max}`}
        value={(health.current / health.max) * 100}
        variant="secondary"
      />
    </WithIcon>
  );
}
