import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import { activeMonster, damageDealt, level, progress } from "state/atoms";

import healthIcon from "icons/hospital-cross.svg";

export default function MonsterHealth() {
  const levelValue = useRecoilValue(level);
  const [damageDealtValue, setDamageDealt] = useRecoilState(damageDealt);
  const setActiveMonster = useSetRecoilState(activeMonster);
  const setProgress = useSetRecoilState(progress);
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
      setProgress((progressValue) => progressValue + 1);
      setActiveMonster(null);
    }
  }, [isDead, setActiveMonster, setProgress]);

  return (
    <WithIcon icon={healthIcon} alt="Monster health">
      <Progress
        variant="danger"
        value={(health.current / health.max) * 100}
        label={isDead ? "Dead" : `${health.current}/${health.max}`}
      />
    </WithIcon>
  );
}
