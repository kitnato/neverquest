import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import useAnimation from "hooks/useAnimation";
import attackIcon from "icons/tron-arrow.svg";
import { isAttacking, defend } from "state/character";
import { level } from "state/global";
import formatCountdown from "utilities/formatCountdown";
import getDamage from "utilities/getDamage";

export default function MonsterAttack({ damagePerHit }) {
  const isAttackingValue = useRecoilValue(isAttacking);
  const levelValue = useRecoilValue(level);
  const setDefend = useSetRecoilState(defend);
  const [canAttack, setCanAttack] = useState(true);
  const [deltaAttack, setDeltaAttack] = useState(0);
  // Need this in case character stops attacking due to 0 stamina.
  const [isEngaged, setEngaged] = useState(false);

  const attackSpeedValue = 3010 - 10 * levelValue;

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackSpeedValue) {
      setDefend(getDamage(damagePerHit));
      setDeltaAttack(0);
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, !canAttack || !isEngaged);

  useEffect(() => {
    if (isAttackingValue && !isEngaged) {
      setEngaged(true);
    }
  }, [isAttackingValue, isEngaged]);

  useEffect(() => () => setCanAttack(false), []);

  return (
    <WithIcon icon={attackIcon} alt="Monster attack rate">
      <div style={{ width: "100%" }}>
        <Progress
          label={formatCountdown(attackSpeedValue - deltaAttack)}
          value={(deltaAttack / attackSpeedValue) * 100}
          variant="info"
        />
      </div>
    </WithIcon>
  );
}
