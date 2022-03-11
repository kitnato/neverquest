import { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilState, useRecoilValue } from "recoil";

import Attributes from "components/Attributes";
import DismissableScreen from "components/DismissableScreen";
import ImageIcon from "components/ImageIcon";
import icon from "icons/skills.svg";
import { attributesIncreasable, isAttacking } from "state/character";
import { isLevelCompleted, show } from "state/global";
import { isEngaged } from "state/monster";

export default function AttributesButton() {
  const attributesIncreasableValue = useRecoilValue(attributesIncreasable);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isEngagedValue = useRecoilValue(isEngaged);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const [showValue, setShow] = useRecoilState(show);
  const [isScreenShowing, setScreenShowing] = useState(false);

  useEffect(() => {
    if (!showValue.attributesButton && isLevelCompletedValue) {
      setShow({ ...showValue, attributesButton: true });
    }
  });

  if (!showValue.attributesButton) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Attributes</Tooltip>} placement="top">
        <span className="d-inline-block">
          <Button
            disabled={isAttackingValue || isEngagedValue}
            onClick={() => setScreenShowing(!isScreenShowing)}
            style={{ position: "relative" }}
            variant="outline-dark"
          >
            <ImageIcon icon={icon} />

            {attributesIncreasableValue > 0 && (
              <Badge bg="secondary" style={{ position: "absolute", top: 12 }}>
                &#43;
              </Badge>
            )}
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        content={<Attributes />}
        isShowing={isScreenShowing}
        onClose={() => setScreenShowing(false)}
        title="Attributes"
      />
    </>
  );
}
