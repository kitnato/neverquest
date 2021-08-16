import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import ImageIcon from "components/ImageIcon";
import useAnimation from "hooks/useAnimation";
import attackIcon from "icons/tron-arrow.svg";
import { isAttacking, defend } from "state/character";
import { level } from "state/global";
import formatCountdown from "utilities/formatCountdown";
import getFromRange from "utilities/getFromRange";

export default function MonsterAttack({ damagePerHit }) {
  const isAttackingValue = useRecoilValue(isAttacking);
  const levelValue = useRecoilValue(level);
  const setDefend = useSetRecoilState(defend);
  const [deltaAttack, setDeltaAttack] = useState(0);
  // Need this in case character stops attacking due to 0 stamina.
  const [isEngaged, setEngaged] = useState(false);

  const attackSpeedValue = 3010 - 10 * getFromRange(levelValue - 1, levelValue);

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackSpeedValue) {
      setDefend(getFromRange(damagePerHit));
      setDeltaAttack(0);
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, !isEngaged);

  useEffect(() => {
    if (isAttackingValue && !isEngaged) {
      setEngaged(true);
    }
  }, [isAttackingValue, isEngaged]);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={attackIcon} tooltip="Monster attack rate" />

      <Progress
        label={formatCountdown(attackSpeedValue - deltaAttack)}
        value={(deltaAttack / attackSpeedValue) * 100}
        variant="info"
      />
    </div>
  );
}
