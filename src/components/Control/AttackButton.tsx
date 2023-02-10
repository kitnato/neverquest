import { MouseEvent, useState } from "react";
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { IconImage } from "@neverquest/components/IconImage";
import { useToggleAttack } from "@neverquest/hooks/actions/useToggleAttack";
import { ReactComponent as IconRetreat } from "@neverquest/icons/return-arrow.svg";
import { ReactComponent as IconResting } from "@neverquest/icons/tired-eye.svg";
import { ReactComponent as IconAttack } from "@neverquest/icons/tron-arrow.svg";
import { areAttributesIncreasable } from "@neverquest/state/attributes";
import { isAttacking } from "@neverquest/state/character";
import { isLevelCompleted, isLevelStarted } from "@neverquest/state/encounter";
import { isHealthLow } from "@neverquest/state/reserves";
import { lowHealthWarning } from "@neverquest/state/settings";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function AttackButton({ isDisabled }: { isDisabled: boolean }) {
  const isAttackingValue = useRecoilValue(isAttacking);
  const areAttributesIncreasableValue = useRecoilValue(areAttributesIncreasable);
  const isHealthLowValue = useRecoilValue(isHealthLow);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isLevelStartedValue = useRecoilValue(isLevelStarted);
  const showLowHealthWarningValue = useRecoilValue(lowHealthWarning);

  const toggleAttack = useToggleAttack();

  const [showAttackConfirmation, setShowAttackConfirmation] = useState(false);

  const pulseAnimation = getAnimationClass({
    isInfinite: true,
    type: AnimationType.Pulse,
  });
  const showWarning =
    isAttackingValue && !isDisabled && showLowHealthWarningValue && isHealthLowValue;

  const { animation, Icon, tooltip } = (() => {
    if (isLevelCompletedValue) {
      return { animation: undefined, Icon: IconResting, tooltip: "Resting" };
    }

    if (isAttackingValue) {
      return {
        animation: showWarning ? pulseAnimation : undefined,
        Icon: IconRetreat,
        tooltip: "Retreat",
      };
    }

    return {
      animation: areAttributesIncreasableValue ? undefined : pulseAnimation,
      Icon: IconAttack,
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
        <span
          className={`d-inline-block ${getAnimationClass({
            type: AnimationType.BounceIn,
          })}`}
        >
          <Button
            className={animation}
            disabled={isDisabled || isLevelCompletedValue}
            onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
              currentTarget.blur();

              if (areAttributesIncreasableValue && !isLevelStartedValue) {
                setShowAttackConfirmation(true);
              } else {
                toggleAttack();
              }
            }}
            variant={UIVariant.Outline}
          >
            <IconImage Icon={Icon} />
          </Button>
        </span>
      </OverlayTrigger>

      <ConfirmationDialog
        confirmationLabel="Attack anyway"
        message="When attacking before spending available essence on attributes, all monsters will need to be defeated before getting another chance."
        onConfirm={toggleAttack}
        setHide={() => setShowAttackConfirmation(false)}
        show={showAttackConfirmation}
        title="Unspent attribute points!"
      />
    </>
  );
}
