import { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilState, useRecoilValue } from "recoil";

import Attributes from "neverquest/components/Attributes";
import DismissableScreen from "neverquest/components/DismissableScreen";
import ImageIcon from "neverquest/components/ImageIcon";
import { UIVariant } from "neverquest/env.d";
import icon from "neverquest/icons/skills.svg";
import { attributesIncreasable, isAttacking } from "neverquest/state/character";
import { isLevelCompleted } from "neverquest/state/global";
import { isMonsterEngaged } from "neverquest/state/monster";
import { showAttributesButton } from "neverquest/state/show";

export default function AttributesButton() {
  const attributesIncreasableValue = useRecoilValue(attributesIncreasable);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterEngagedValue = useRecoilValue(isMonsterEngaged);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const [showAttributesButtonValue, setShowAttributesButton] = useRecoilState(showAttributesButton);
  const [isScreenShowing, setScreenShowing] = useState(false);

  useEffect(() => {
    if (!showAttributesButtonValue && isLevelCompletedValue) {
      setShowAttributesButton(true);
    }
  }, [isLevelCompletedValue, showAttributesButtonValue]);

  if (!showAttributesButtonValue) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Attributes</Tooltip>} placement="top">
        <span className="d-inline-block">
          <Button
            disabled={isAttackingValue || isMonsterEngagedValue}
            onClick={() => setScreenShowing(!isScreenShowing)}
            style={{ position: "relative" }}
            variant={UIVariant.Outline}
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
