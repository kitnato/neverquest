import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue } from "recoil";

import Attributes from "components/Attributes";
import DismissableScreen from "components/DismissableScreen";
import ImageIcon from "components/ImageIcon";
import icon from "icons/skills.svg";
import { attributesIncreasable, isAttacking } from "state/character";
import { show } from "state/global";
import { isEngaged } from "state/monster";

export default function AttributesButton() {
  const attributesIncreasableValue = useRecoilValue(attributesIncreasable);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isEngagedValue = useRecoilValue(isEngaged);
  const showValue = useRecoilValue(show);
  const [isScreenShowing, setScreenShowing] = useState(false);

  if (!showValue.attributes) {
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
