import {
  Button,
  OverlayTrigger,
  Popover,
  PopoverBody,
  PopoverHeader,
  Tooltip,
} from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking";
import IconAttack from "@neverquest/icons/attack.svg?react";
import IconResting from "@neverquest/icons/resting.svg?react";
import IconRetreat from "@neverquest/icons/retreat.svg?react";
import { areAttributesAffordable } from "@neverquest/state/attributes";
import { hasEnoughAmmunition, isAttacking, isGameOver } from "@neverquest/state/character";
import { isStageCompleted, location } from "@neverquest/state/encounter";
import { isHealthLow } from "@neverquest/state/reserves";
import { lowHealthWarning } from "@neverquest/state/settings";
import type { SVGIcon } from "@neverquest/types/components";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function AttackButton() {
  const areAttributesIncreasableValue = useRecoilValue(areAttributesAffordable);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isHealthLowValue = useRecoilValue(isHealthLow);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const hasEnoughAmmunitionValue = useRecoilValue(hasEnoughAmmunition);
  const locationValue = useRecoilValue(location);
  const showLowHealthWarningValue = useRecoilValue(lowHealthWarning);

  const toggleAttacking = useToggleAttacking();

  const pulseAnimation = getAnimationClass({
    animation: "pulse",
    isInfinite: true,
  });
  const isResting = isGameOverValue || isStageCompletedValue || locationValue === "caravan";
  const showWarning =
    isAttackingValue && isHealthLowValue && !isResting && showLowHealthWarningValue;

  const { animation, Icon, tooltip }: { animation?: string; Icon: SVGIcon; tooltip: string } =
    (() => {
      if (isResting) {
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
        animation:
          areAttributesIncreasableValue || !hasEnoughAmmunitionValue ? undefined : pulseAnimation,
        Icon: IconAttack,
        tooltip: hasEnoughAmmunitionValue ? "Attack" : "Insufficient ammunition.",
      };
    })();

  return (
    <OverlayTrigger
      overlay={
        showWarning ? (
          <Popover>
            <PopoverHeader className="text-center">Low health</PopoverHeader>

            <PopoverBody>Retreat now!</PopoverBody>
          </Popover>
        ) : (
          <Tooltip>{tooltip}</Tooltip>
        )
      }
      show={showWarning || undefined}
    >
      <span className={getAnimationClass({ animation: "bounceIn" })}>
        <Button
          className={animation}
          disabled={isResting || !hasEnoughAmmunitionValue}
          onClick={toggleAttacking}
          variant="outline-dark"
        >
          <IconImage Icon={Icon} />
        </Button>
      </span>
    </OverlayTrigger>
  );
}