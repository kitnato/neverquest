import React from "react";
import { useRecoilValue } from "recoil";
import Button from "react-bootstrap/Button";

import { engaged } from "state/atoms";
import { levelCompleted } from "state/selectors";
import { currentStamina } from "state/character/selectors";

export default function AttackButton({ onClick, isRecharging }) {
  const { canAttack } = useRecoilValue(currentStamina);
  const engagedValue = useRecoilValue(engaged);
  const levelCompletedValue = useRecoilValue(levelCompleted);

  return (
    <Button
      variant="primary"
      disabled={!canAttack || isRecharging || levelCompletedValue}
      onClick={onClick}
      block
    >
      {engagedValue ? "Attack" : "Engage"}
    </Button>
  );
}
