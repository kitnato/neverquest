import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue, useRecoilState } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/fist.svg";
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
    <OverlayTrigger overlay={<Tooltip>{label}</Tooltip>} placement="top">
      <Button
        disabled={isAttackingValue || isLevelCompletedValue}
        onClick={onAttack}
        variant="outline-dark"
      >
        <ImageIcon icon={icon} />
      </Button>
    </OverlayTrigger>
  );
}
