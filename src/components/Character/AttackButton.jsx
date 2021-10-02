import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useRecoilValue, useRecoilState } from "recoil";

import { isAttacking, isRecovering } from "state/character";
import { isLevelCompleted } from "state/global";

export default function AttackButton() {
  const [isAttackingValue, setAttacking] = useRecoilState(isAttacking);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isRecoveringValue = useRecoilValue(isRecovering);

  const label = (() => {
    if (isLevelCompletedValue) {
      return "Resting";
    }

    if (isRecoveringValue) {
      return "Recovering";
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
