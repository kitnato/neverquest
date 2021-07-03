import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { attacking, level } from "state/atoms";
import { defend } from "state/selectors";
import formatCountdown from "utilities/formatCountdown";
import getDamage from "utilities/getDamage";

export default function MonsterAttack({ damagePerHit }) {
  const isAttacking = useRecoilValue(attacking);
  const levelValue = useRecoilValue(level);
  const setDefend = useSetRecoilState(defend);
  const [canAttack, setCanAttack] = useState(true);
  const [deltaAttack, setDeltaAttack] = useState(0);
  // Need this in case character stops attacking due to no stamina.
  const [isEngaged, setEngaged] = useState(false);

  const attackSpeedValue = 2000 - 10 * levelValue;

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackSpeedValue) {
      setDefend(getDamage(damagePerHit));
      setDeltaAttack(0);
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, !canAttack || !isEngaged);

  useEffect(() => {
    if (isAttacking && !isEngaged) {
      setEngaged(true);
    }
  }, [isAttacking, isEngaged]);

  useEffect(() => () => setCanAttack(false), []);

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>Monster attack rate</Tooltip>}
    >
      <div>
        <Progress
          label={
            isEngaged
              ? formatCountdown(attackSpeedValue - deltaAttack)
              : "Lurking"
          }
          value={(deltaAttack / attackSpeedValue) * 100}
          variant="info"
        />
      </div>
    </OverlayTrigger>
  );
}
