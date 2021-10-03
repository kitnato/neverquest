import { useState } from "react";
import { useSetRecoilState } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { defend } from "state/character";
import formatCountdown from "utilities/formatCountdown";
import { getFromRange } from "utilities/helpers";

export default function MonsterAttackMeter({ attackRate, damagePerHit }) {
  const setDefend = useSetRecoilState(defend);
  const [deltaAttack, setDeltaAttack] = useState(0);

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackRate) {
      setDefend(getFromRange(damagePerHit));
      setDeltaAttack(0);
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  });

  return (
    <Progress
      label={formatCountdown(attackRate - deltaAttack)}
      value={(deltaAttack / attackRate) * 100}
      variant="warning"
    />
  );
}
