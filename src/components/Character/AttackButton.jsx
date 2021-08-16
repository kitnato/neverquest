import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Button from "react-bootstrap/Button";

import { isAttacking } from "state/character";
import { levelCompleted } from "state/global";

export default function AttackButton() {
  const [isAttackingValue, setAttacking] = useRecoilState(isAttacking);
  const isLevelCompleted = useRecoilValue(levelCompleted);
  const label = (() => {
    if (isLevelCompleted) {
      return "Resting";
    }

    if (isAttackingValue) {
      return "Attacking";
    }

    return "Attack";
  })();

  useEffect(() => {
    if (isLevelCompleted && isAttacking) {
      setAttacking(false);
    }
  }, [isAttackingValue, isLevelCompleted, setAttacking]);

  return (
    <Button
      block
      disabled={isAttackingValue || isLevelCompleted}
      onClick={() => setAttacking(!isAttackingValue)}
      variant="outline-dark"
    >
      {label}
    </Button>
  );
}
