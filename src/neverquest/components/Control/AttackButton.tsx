import { MouseEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PopoverBody from "react-bootstrap/PopoverBody";
import PopoverHeader from "react-bootstrap/PopoverHeader";
import Tooltip from "react-bootstrap/Tooltip";
import { useAtomValue, useAtom } from "jotai";

import ConfirmationDialog from "neverquest/components/ConfirmationDialog";
import ImageIcon from "neverquest/components/ImageIcon";
import attackIcon from "neverquest/icons/tron-arrow.svg";
import restingIcon from "neverquest/icons/tired-eye.svg";
import retreatIcon from "neverquest/icons/return-arrow.svg";
import { attributesIncreasable } from "neverquest/state/attributes";
import { isAttacking } from "neverquest/state/character";
import { isLevelCompleted } from "neverquest/state/encounter";
import { isMonsterEngaged } from "neverquest/state/monster";
import { isHealthLow } from "neverquest/state/reserves";
import { showLowHealthWarning, showWildernessProgress } from "neverquest/state/show";
import { AnimationType, UIVariant } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function AttackButton() {
  const [isAttackingValue, setAttacking] = useAtom(isAttacking);
  const [showWildernessProgressValue, setShowWildernessProgressValue] =
    useAtom(showWildernessProgress);
  const attributesIncreasableValue = useAtomValue(attributesIncreasable);
  const isHealthLowValue = useAtomValue(isHealthLow);
  const isLevelCompletedValue = useAtomValue(isLevelCompleted);
  const isMonsterEngagedValue = useAtomValue(isMonsterEngaged);
  const showLowHealthWarningValue = useAtomValue(showLowHealthWarning);

  const [showAttackConfirmation, setShowAttackConfirmation] = useState(false);

  const pulseAnimation = getAnimationClass(AnimationType.Pulse, true);
  const showWarning = isAttackingValue && showLowHealthWarningValue && isHealthLowValue;

  const toggleAttack = () => {
    setAttacking((current) => !current);

    if (!showWildernessProgressValue) {
      setShowWildernessProgressValue(true);
    }
  };

  useEffect(() => {
    if (isAttackingValue && isLevelCompletedValue) {
      setAttacking(false);
    }
  }, [isAttackingValue, isLevelCompletedValue, setAttacking]);

  const { animation, icon, tooltip } = (() => {
    if (isLevelCompletedValue) {
      return { animation: "", icon: restingIcon, tooltip: "Resting" };
    }

    if (isAttackingValue) {
      return {
        animation: showWarning ? pulseAnimation : "",
        icon: retreatIcon,
        tooltip: "Retreat",
      };
    }

    return {
      animation: attributesIncreasableValue ? "" : pulseAnimation,
      icon: attackIcon,
      tooltip: "Attack",
    };
  })();

  return (
    <>
      <OverlayTrigger
        overlay={
          showWarning ? (
            <Popover>
              <PopoverHeader>
                <strong>Low health</strong>
              </PopoverHeader>

              <PopoverBody>Retreat now!</PopoverBody>
            </Popover>
          ) : (
            <Tooltip>{tooltip}</Tooltip>
          )
        }
        placement="top"
        show={showWarning || undefined}
      >
        <span className="d-inline-block">
          <Button
            className={animation}
            disabled={isLevelCompletedValue}
            onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
              currentTarget.blur();

              if (attributesIncreasableValue && !isMonsterEngagedValue) {
                setShowAttackConfirmation(true);
              } else {
                toggleAttack();
              }
            }}
            variant={UIVariant.Outline}
          >
            <ImageIcon icon={icon} />
          </Button>
        </span>
      </OverlayTrigger>

      <ConfirmationDialog
        confirmationLabel="Attack"
        onConfirm={toggleAttack}
        message="If you attack before increasing your attributes, you will have to kill all monsters before you get another chance."
        setHide={() => setShowAttackConfirmation(false)}
        show={showAttackConfirmation}
        title="Unspent attribute points!"
      />
    </>
  );
}
