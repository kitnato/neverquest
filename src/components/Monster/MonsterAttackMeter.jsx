import { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { isAttacking, defend } from "state/character";
import formatCountdown from "utilities/formatCountdown";
import { getFromRange } from "utilities/helpers";

export default function MonsterAttackMeter({ attackSpeed, damagePerHit }) {
  const isAttackingValue = useRecoilValue(isAttacking);
  const setDefend = useSetRecoilState(defend);
  const [deltaAttack, setDeltaAttack] = useState(0);

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackSpeed) {
      setDefend(getFromRange(damagePerHit));
      setDeltaAttack(0);
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, !isAttackingValue);

  return (
    <Progress
      label={formatCountdown(attackSpeed - deltaAttack)}
      value={(deltaAttack / attackSpeed) * 100}
      variant="info"
    />
  );
}
