import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import Button from "react-bootstrap/Button";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { attackSpeed } from "state/character/selectors";
import formatCountdown from "utilities/formatCountdown";

export default function Attack() {
  const attackSpeedValue = useRecoilValue(attackSpeed);
  const [elapsedAttack, setAttacked] = useState(-1);
  const displayAttack = elapsedAttack > -1 ? elapsedAttack : attackSpeedValue;

  useAnimation((deltaTime) => {
    if (elapsedAttack >= attackSpeedValue) {
      setAttacked(-1);
    } else if (elapsedAttack > -1) {
      setAttacked(elapsedAttack + deltaTime);
    }
  }, elapsedAttack === -1);

  return (
    <div>
      <Progress
        variant="warning"
        value={(displayAttack / attackSpeedValue) * 100}
        label={
          elapsedAttack > -1
            ? formatCountdown(attackSpeedValue - displayAttack)
            : "Ready"
        }
        className="mb-2"
      />

      <Button
        variant="primary"
        disabled={displayAttack < attackSpeedValue}
        onClick={() => setAttacked(0)}
        block
      >
        Attack
      </Button>
    </div>
  );
}
