import { useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue } from "recoil";

import Attributes from "components/Attributes";
import DismissableScreen from "components/DismissableScreen";
import ImageIcon from "components/ImageIcon";
import icon from "icons/skills.svg";
import { isAttacking } from "state/character";
import { show } from "state/global";
import { isEngaged } from "state/monster";

export default function AttributesButton() {
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
            variant="outline-dark"
          >
            <ImageIcon icon={icon} />
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
