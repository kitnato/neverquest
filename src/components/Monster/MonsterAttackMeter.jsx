import { useState } from "react";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import useCombat from "hooks/useCombat";
import formatCountdown from "utilities/formatCountdown";
import { getFromRange } from "utilities/helpers";

export default function MonsterAttackMeter({ attackRate, damagePerHit }) {
  const [deltaAttack, setDeltaAttack] = useState(0);

  const { defend } = useCombat();

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackRate) {
      defend(getFromRange(damagePerHit));
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
