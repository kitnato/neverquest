import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import ImageIcon from "components/ImageIcon";
import { damageDealt } from "state/character";
import { level } from "state/global";

import icon from "icons/hospital-cross.svg";

export default function MonsterHealth({ onDeath }) {
  const levelValue = useRecoilValue(level);
  const [damageDealtValue, setDamageDealt] = useRecoilState(damageDealt);
  const [health, setHealth] = useState({
    current: levelValue + 4,
    max: levelValue + 4,
  });

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
    if (health.current === 0) {
      onDeath();
    }
  }, [health, onDeath]);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Monster health" />

      <Progress
        label={`${health.current}/${health.max}`}
        value={(health.current / health.max) * 100}
        variant="secondary"
      />
    </div>
  );
}
