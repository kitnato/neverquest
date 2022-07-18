import { useAtomValue, useAtom } from "jotai";
import { MouseEvent, useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";

import ConfirmationDialog from "@neverquest/components/ConfirmationDialog";
import ImageIcon from "@neverquest/components/ImageIcon";
import attackIcon from "@neverquest/icons/tron-arrow.svg";
import restingIcon from "@neverquest/icons/tired-eye.svg";
import retreatIcon from "@neverquest/icons/return-arrow.svg";
import { attributesIncreasable } from "@neverquest/state/attributes";
import { isAttacking } from "@neverquest/state/character";
import { isLevelCompleted } from "@neverquest/state/encounter";
import { isMonsterEngaged } from "@neverquest/state/monster";
import { isHealthLow } from "@neverquest/state/reserves";
import { showLowHealthWarning, showWildernessStatus } from "@neverquest/state/show";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function AttackButton({ isDisabled }: { isDisabled: boolean }) {
  const [isAttackingValue, setAttacking] = useAtom(isAttacking);
  const [showWildernessStatusValue, setShowWildernessStatusValue] = useAtom(showWildernessStatus);
  const attributesIncreasableValue = useAtomValue(attributesIncreasable);
  const isHealthLowValue = useAtomValue(isHealthLow);
  const isLevelCompletedValue = useAtomValue(isLevelCompleted);
  const isMonsterEngagedValue = useAtomValue(isMonsterEngaged);
  const showLowHealthWarningValue = useAtomValue(showLowHealthWarning);

  const [showAttackConfirmation, setShowAttackConfirmation] = useState(false);

  const pulseAnimation = getAnimationClass({ isInfinite: true, type: AnimationType.Pulse });
  const showWarning =
    isAttackingValue && !isDisabled && showLowHealthWarningValue && isHealthLowValue;

  const toggleAttack = () => {
    setAttacking((current) => !current);

    if (!showWildernessStatusValue) {
      setShowWildernessStatusValue(true);
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
              <Popover.Header>
                <strong>Low health</strong>
              </Popover.Header>

              <Popover.Body>Retreat now!</Popover.Body>
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
            disabled={isDisabled || isLevelCompletedValue}
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
