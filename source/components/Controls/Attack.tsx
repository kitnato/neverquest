import {
  Badge,
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
import IconSpinning from "@neverquest/icons/spinning.svg?react";
import { areAttributesAffordable } from "@neverquest/state/attributes";
import { hasEnoughAmmunition, hasFlatlined, isAttacking } from "@neverquest/state/character";
import { isStageCompleted, location } from "@neverquest/state/encounter";
import { canAutoProgress } from "@neverquest/state/items";
import { isHealthLow } from "@neverquest/state/reserves";
import type { SVGIcon } from "@neverquest/types/components";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Attack() {
  const areAttributesIncreasableValue = useRecoilValue(areAttributesAffordable);
  const canAutoProgressValue = useRecoilValue(canAutoProgress);
  const hasEnoughAmmunitionValue = useRecoilValue(hasEnoughAmmunition);
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isHealthLowValue = useRecoilValue(isHealthLow);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const locationValue = useRecoilValue(location);

  const toggleAttacking = useToggleAttacking();

  const pulseAnimation = getAnimationClass({
    animation: "pulse",
    isInfinite: true,
  });
  const isResting = hasFlatlinedValue || isStageCompletedValue || locationValue === "caravan";
  const showWarning = isAttackingValue && isHealthLowValue && !isResting;

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
        tooltip: "Attack",
      };
    })();

  return (
    <OverlayTrigger
      overlay={
        showWarning ? (
          <Popover>
            <PopoverHeader className="text-center">Low health</PopoverHeader>

            <PopoverBody>
              <span>Retreat now!</span>
            </PopoverBody>
          </Popover>
        ) : (
          <Tooltip>{tooltip}</Tooltip>
        )
      }
      show={showWarning || undefined}
    >
      <div className={getAnimationClass({ animation: "bounceIn" })}>
        <Button
          className={animation}
          disabled={isResting}
          onClick={toggleAttacking}
          variant="outline-dark"
        >
          <IconImage Icon={Icon} />

          {canAutoProgressValue && !isResting && (
            <Badge bg="secondary" className="position-absolute top-50 start-100 translate-middle">
              <IconImage className="small" Icon={IconSpinning} />
            </Badge>
          )}
        </Button>
      </div>
    </OverlayTrigger>
  );
}
