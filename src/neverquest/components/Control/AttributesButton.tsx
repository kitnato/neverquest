import { MouseEvent, useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useAtom, useAtomValue } from "jotai";

import Attributes from "neverquest/components/Attributes";
import DismissableScreen from "neverquest/components/DismissableScreen";
import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/skills.svg";
import { attributesIncreasable, isAttacking } from "neverquest/state/character";
import { isLevelCompleted } from "neverquest/state/global";
import { isMonsterEngaged } from "neverquest/state/monster";
import { showAttributesButton } from "neverquest/state/show";
import { AnimationType, UIVariant } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function AttributesButton() {
  const attributesIncreasableValue = useAtomValue(attributesIncreasable);
  const isAttackingValue = useAtomValue(isAttacking);
  const isMonsterEngagedValue = useAtomValue(isMonsterEngaged);
  const isLevelCompletedValue = useAtomValue(isLevelCompleted);
  const [showAttributesButtonValue, setShowAttributesButton] = useAtom(showAttributesButton);
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
        <span className={`${getAnimationClass(AnimationType.FlipInX)} d-inline-block`}>
          <Button
            disabled={isAttackingValue || isMonsterEngagedValue}
            className="position-relative"
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              setScreenShowing(true);
              event.currentTarget.blur();
            }}
            variant={UIVariant.Outline}
          >
            <ImageIcon icon={icon} />

            {attributesIncreasableValue > 0 && (
              <Badge bg="secondary" className="position-absolute" style={{ top: 12 }}>
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
