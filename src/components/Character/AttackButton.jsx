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
      block
      disabled={isAttacking || isLevelCompleted}
      onClick={() => setAttacking(!isAttacking)}
      style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      variant="outline-dark"
    >
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLevelCompleted ? "Resting" : isAttacking ? "Attacking" : "Attack"}
    </Button>
  );
}
