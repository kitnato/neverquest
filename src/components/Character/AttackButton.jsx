import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Button from "react-bootstrap/Button";

import { isAttacking } from "state/character";
import { isLevelCompleted } from "state/global";

export default function AttackButton() {
  const [isAttackingValue, setAttacking] = useRecoilState(isAttacking);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const label = (() => {
    if (isLevelCompletedValue) {
      return "Resting";
    }

    if (isAttackingValue) {
      return "Attacking";
    }

    return "Attack";
  })();

  useEffect(() => {
    if (isLevelCompletedValue && isAttacking) {
      setAttacking(false);
    }
  }, [isAttackingValue, isLevelCompletedValue, setAttacking]);

  return (
    <Button
      block
      disabled={isAttackingValue || isLevelCompletedValue}
      onClick={() => setAttacking(!isAttackingValue)}
      variant="outline-dark"
    >
      {label}
    </Button>
  );
}
