import { useAtom, useAtomValue } from "jotai";
import { MouseEvent, useEffect, useState } from "react";
import { Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import Attributes from "neverquest/components/Attributes";
import DismissableScreen from "neverquest/components/DismissableScreen";
import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/skills.svg";
import { attributesIncreasable } from "neverquest/state/attributes";
import { isAttacking } from "neverquest/state/character";
import { isLevelCompleted } from "neverquest/state/encounter";
import { isMonsterEngaged } from "neverquest/state/monster";
import { showAttributesButton } from "neverquest/state/show";
import { AnimationType, UIVariant } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function AttributesButton({ isDisabled }: { isDisabled: boolean }) {
  const attributesIncreasableValue = useAtomValue(attributesIncreasable);
  const isAttackingValue = useAtomValue(isAttacking);
  const isMonsterEngagedValue = useAtomValue(isMonsterEngaged);
  const isLevelCompletedValue = useAtomValue(isLevelCompleted);
  const [showAttributesButtonValue, setShowAttributesButton] = useAtom(showAttributesButton);
  const [isScreenShowing, setScreenShowing] = useState(false);

  const isButtonDisabled = isAttackingValue || isDisabled || isMonsterEngagedValue;

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
        <span className={`${getAnimationClass({ type: AnimationType.FlipInX })} d-inline-block`}>
          <Button
            disabled={isButtonDisabled}
            className={`position-relative${
              attributesIncreasableValue && !isButtonDisabled
                ? ` ${getAnimationClass({ isInfinite: true, type: AnimationType.Pulse })}`
                : ""
            }`}
            onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
              currentTarget.blur();

              setScreenShowing(true);
            }}
            variant={UIVariant.Outline}
          >
            <ImageIcon icon={icon} />

            {attributesIncreasableValue && (
              <Badge bg="secondary" className="position-absolute" style={{ top: 12 }}>
                &#43;
              </Badge>
            )}
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        contents={<Attributes />}
        isShowing={isScreenShowing}
        onClose={() => setScreenShowing(false)}
        title="Attributes"
      />
    </>
  );
}
