import { MouseEvent, useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { useRecoilValue, useRecoilState } from "recoil";

import ConfirmationDialog from "@neverquest/components/ConfirmationDialog";
import IconImage from "@neverquest/components/IconImage";
import { ReactComponent as IconRetreat } from "@neverquest/icons/return-arrow.svg";
import { ReactComponent as IconResting } from "@neverquest/icons/tired-eye.svg";
import { ReactComponent as IconAttack } from "@neverquest/icons/tron-arrow.svg";
import { attributesIncreasable } from "@neverquest/state/attributes";
import { isAttacking } from "@neverquest/state/character";
import { isLevelCompleted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { isMonsterEngaged } from "@neverquest/state/monster";
import { isHealthLow } from "@neverquest/state/reserves";
import { lowHealthWarning } from "@neverquest/state/settings";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";
import { ShowingType } from "@neverquest/types/enums";

export default function ({ isDisabled }: { isDisabled: boolean }) {
  const [isAttackingValue, setAttacking] = useRecoilState(isAttacking);
  const [showWildernessStatusValue, setShowWildernessStatusValue] = useRecoilState(
    isShowing(ShowingType.WildernessStatus)
  );
  const attributesIncreasableValue = useRecoilValue(attributesIncreasable);
  const isHealthLowValue = useRecoilValue(isHealthLow);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isMonsterEngagedValue = useRecoilValue(isMonsterEngaged);
  const showLowHealthWarningValue = useRecoilValue(lowHealthWarning);

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
      animation: attributesIncreasableValue ? "" : pulseAnimation,
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
            <IconImage Icon={Icon} />
          </Button>
        </span>
      </OverlayTrigger>

      <ConfirmationDialog
        confirmationLabel="Attack anyway"
        onConfirm={toggleAttack}
        message="If you attack before increasing your attributes, you will have to kill all monsters before you get another chance."
        setHide={() => setShowAttackConfirmation(false)}
        show={showAttackConfirmation}
        title="Unspent attribute points!"
      />
    </>
  );
}
