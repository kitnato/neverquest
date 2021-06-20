import React from "react";
import { useRecoilValue } from "recoil";
import Button from "react-bootstrap/Button";

import { progress } from "state/atoms";
import { progressMax } from "state/selectors";
import { currentStamina } from "state/character/selectors";

export default function AttackButton({ onClick, isRecharging }) {
  const { canAttack } = useRecoilValue(currentStamina);
  const progressValue = useRecoilValue(progress);
  const progressMaxValue = useRecoilValue(progressMax);
  const levelComplete = progressValue === progressMaxValue;

  return (
    <Button
      variant="primary"
      disabled={!canAttack || isRecharging || levelComplete}
      onClick={onClick}
      block
    >
      Attack
    </Button>
  );
}
