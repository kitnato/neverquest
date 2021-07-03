import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import useAnimation from "hooks/useAnimation";
import attackIcon from "icons/tron-arrow.svg";
import { attacking } from "state/atoms";
import { attack, attackSpeed } from "state/selectors";
import formatCountdown from "utilities/formatCountdown";

export default function Attack() {
  const attackSpeedValue = useRecoilValue(attackSpeed);
  const setAttack = useSetRecoilState(attack);
  const isAttacking = useRecoilValue(attacking);
  const [deltaAttack, setDeltaAttack] = useState(0);

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackSpeedValue) {
      setAttack();
      setDeltaAttack(0);
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, !isAttacking);

  useEffect(() => {
    if (!isAttacking) {
      setDeltaAttack(0);
    }
  }, [isAttacking]);

  return (
    <WithIcon icon={attackIcon} alt="Attack rate">
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
