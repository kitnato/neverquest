import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Button from "react-bootstrap/Button";

import { attacking } from "state/character";
import { levelCompleted } from "state/global";

export default function AttackButton() {
  const [isAttacking, setAttacking] = useRecoilState(attacking);
  const isLevelCompleted = useRecoilValue(levelCompleted);
  const label = (() => {
    if (isLevelCompleted) {
      return "Resting";
    }

    if (isAttacking) {
      return "Attacking";
    }

    return "Attack";
  })();

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
      variant="outline-dark"
    >
      {label}
    </Button>
  );
}
