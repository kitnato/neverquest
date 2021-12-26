import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import useDefend from "hooks/useDefend";
import { isEngaged, totalAttackRateMonster } from "state/monster";
import formatCountdown from "utilities/formatCountdown";

export default function MonsterAttackMeter() {
  const defend = useDefend();
  const isEngagedValue = useRecoilValue(isEngaged);
  const totalAttackRateMonsterValue = useRecoilValue(totalAttackRateMonster);
  const [deltaAttack, setDeltaAttack] = useState(0);

  useEffect(() => {
    if (deltaAttack >= totalAttackRateMonsterValue) {
      setDeltaAttack(0);
      defend();
    }
  }, [defend, deltaAttack, totalAttackRateMonsterValue]);

  useAnimation((deltaTime) => {
    setDeltaAttack((currentDelta) => currentDelta + deltaTime);
  }, !isEngagedValue);

  return (
    <Progress
      label={formatCountdown(totalAttackRateMonsterValue - deltaAttack)}
      value={(deltaAttack / totalAttackRateMonsterValue) * 100}
      variant="warning"
    />
  );
}
