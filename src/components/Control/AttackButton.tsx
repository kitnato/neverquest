import { MouseEvent, useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import ConfirmationDialog from "@neverquest/components/ConfirmationDialog";
import IconImage from "@neverquest/components/IconImage";
import { ReactComponent as IconRetreat } from "@neverquest/icons/return-arrow.svg";
import { ReactComponent as IconResting } from "@neverquest/icons/tired-eye.svg";
import { ReactComponent as IconAttack } from "@neverquest/icons/tron-arrow.svg";
import { areAttributesIncreasable } from "@neverquest/state/attributes";
import { isAttacking } from "@neverquest/state/character";
import { isLevelCompleted, isLevelStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { isHealthLow } from "@neverquest/state/reserves";
import { lowHealthWarning } from "@neverquest/state/settings";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function ({ isDisabled }: { isDisabled: boolean }) {
  const [isAttackingValue, setAttacking] = useRecoilState(isAttacking);
  const [showWildernessStatusValue, setShowWildernessStatusValue] = useRecoilState(
    isShowing(ShowingType.WildernessStatus)
  );
  const areAttributesIncreasableValue = useRecoilValue(areAttributesIncreasable);
  const isHealthLowValue = useRecoilValue(isHealthLow);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isLevelStartedValue = useRecoilValue(isLevelStarted);
  const showLowHealthWarningValue = useRecoilValue(lowHealthWarning);

  const [showAttackConfirmation, setShowAttackConfirmation] = useState(false);

  const pulseAnimation = getAnimationClass({
    isInfinite: true,
    type: AnimationType.Pulse,
  });
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

  const { animation, Icon, tooltip } = (() => {
    if (isLevelCompletedValue) {
      return { animation: "", Icon: IconResting, tooltip: "Resting" };
    }

    if (isAttackingValue) {
      return {
        animation: showWarning ? pulseAnimation : "",
        Icon: IconRetreat,
        tooltip: "Retreat",
      };
    }

    return {
      animation: areAttributesIncreasableValue ? "" : pulseAnimation,
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
        message="If you attack before increasing your attributes, you will have to defeat all monsters before you get another chance."
        onConfirm={toggleAttack}
        setHide={() => setShowAttackConfirmation(false)}
        show={showAttackConfirmation}
        title="Unspent attribute points!"
      />
    </>
  );
}
