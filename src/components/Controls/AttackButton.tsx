import { useState } from "react";
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { IconImage } from "@neverquest/components/IconImage";
import { useToggleAttack } from "@neverquest/hooks/actions/useToggleAttack";
import { ReactComponent as IconAttack } from "@neverquest/icons/attack.svg";
import { ReactComponent as IconResting } from "@neverquest/icons/resting.svg";
import { ReactComponent as IconRetreat } from "@neverquest/icons/retreat.svg";
import { areAttributesIncreasable } from "@neverquest/state/attributes";
import { isAttacking, isGameOver } from "@neverquest/state/character";
import { isStageCompleted, isStageStarted, isWilderness } from "@neverquest/state/encounter";
import { isHealthLow } from "@neverquest/state/reserves";
import { confirmControlWarnings, lowHealthWarning } from "@neverquest/state/settings";
import type { SVGIcon } from "@neverquest/types/props";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function AttackButton() {
  const areAttributesIncreasableValue = useRecoilValue(areAttributesIncreasable);
  const confirmControlWarningsValue = useRecoilValue(confirmControlWarnings);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isHealthLowValue = useRecoilValue(isHealthLow);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const showLowHealthWarningValue = useRecoilValue(lowHealthWarning);

  const toggleAttack = useToggleAttack();

  const [showAttackConfirmation, setShowAttackConfirmation] = useState(false);

  const pulseAnimation = getAnimationClass({
    isInfinite: true,
    type: "pulse",
  });
  const isDisabled = isGameOverValue || isStageCompletedValue || !isWildernessValue;
  const showWarning =
    isAttackingValue && !isDisabled && showLowHealthWarningValue && isHealthLowValue;

  const { animation, Icon, tooltip }: { animation?: string; Icon: SVGIcon; tooltip: string } =
    (() => {
      if (isDisabled) {
        return { Icon: IconResting, tooltip: "Resting" };
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

  const handleAttack = () => {
    if (areAttributesIncreasableValue && confirmControlWarningsValue && !isStageStartedValue) {
      setShowAttackConfirmation(true);
    } else {
      toggleAttack();
    }
  };

  return (
    <>
      <OverlayTrigger
        overlay={
          showWarning ? (
            <Popover>
              <Popover.Header className="text-center">
                <strong>Low health</strong>
              </Popover.Header>

              <Popover.Body>Retreat now!</Popover.Body>
            </Popover>
          ) : (
            <Tooltip>{tooltip}</Tooltip>
          )
        }
        show={showWarning || undefined}
      >
        <span
          className={`d-inline-block ${getAnimationClass({
            type: "bounceIn",
          })}`}
        >
          <Button
            className={animation}
            disabled={isDisabled}
            onClick={handleAttack}
            variant="outline-dark"
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
