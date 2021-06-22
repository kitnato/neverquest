import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Button from "react-bootstrap/Button";

import { attacking } from "state/atoms";
import { levelCompleted } from "state/selectors";

export default function AttackButton() {
  const [isAttacking, setAttacking] = useRecoilState(attacking);
  const isLevelCompleted = useRecoilValue(levelCompleted);

  useEffect(() => {
    if (isLevelCompleted && isAttacking) {
      setAttacking(false);
    }
  }, [isAttacking, isLevelCompleted, setAttacking]);

  return (
    <Button
      variant="primary"
      disabled={isAttacking || isLevelCompleted}
      onClick={() => setAttacking(!isAttacking)}
      block
    >
      {!isAttacking && !isLevelCompleted && "Attack"}
      {isAttacking && "Attacking"}
      {isLevelCompleted && "Resting"}
    </Button>
  );
}
