import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useRecoilValue, useRecoilState } from "recoil";

import { isAttacking, isRecovering } from "state/character";
import { isLevelCompleted, show } from "state/global";

export default function AttackButton() {
  const [isAttackingValue, setAttacking] = useRecoilState(isAttacking);
  const [showValue, setShow] = useRecoilState(show);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isRecoveringValue = useRecoilValue(isRecovering);

  useEffect(() => {
    if (isAttackingValue && isLevelCompletedValue) {
      setAttacking(false);
    }
  }, [isAttackingValue, isLevelCompletedValue, setAttacking]);

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

  const onAttack = () => {
    setAttacking(true);

    if (!showValue.levelProgress) {
      setShow({ ...show, levelProgress: true });
    }
  };

  return (
    <Button
      block
      disabled={isAttackingValue || isLevelCompletedValue}
      onClick={onAttack}
      variant="outline-dark"
    >
      {label}
    </Button>
  );
}
