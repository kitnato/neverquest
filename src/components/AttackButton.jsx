import React from "react";
import { useRecoilValue } from "recoil";
import Button from "react-bootstrap/Button";

import { currentStamina } from "state/character/selectors";

export default function AttackButton({ onClick, isRecharging }) {
  const { canAttack } = useRecoilValue(currentStamina);

  return (
    <Button
      variant="primary"
      disabled={!canAttack || isRecharging}
      onClick={onClick}
      block
    >
      Attack
    </Button>
  );
}
