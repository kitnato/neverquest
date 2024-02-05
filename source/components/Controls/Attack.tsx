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
import IconGrinding from "@neverquest/icons/grinding.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconResting from "@neverquest/icons/resting.svg?react";
import IconRetreat from "@neverquest/icons/retreat.svg?react";
import { areAttributesAffordable } from "@neverquest/state/attributes";
import { hasEnoughAmmunition, hasFlatlined, isAttacking } from "@neverquest/state/character";
import { encounter, isStageCompleted, location } from "@neverquest/state/encounter";
import { isRelicEquipped } from "@neverquest/state/items";
import { isMonsterDead } from "@neverquest/state/monster";
import { isHealthLow } from "@neverquest/state/reserves";
import type { SVGIcon } from "@neverquest/types/components";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Attack() {
  const areAttributesAffordableValue = useRecoilValue(areAttributesAffordable);
  const encounterValue = useRecoilValue(encounter);
  const hasEnoughAmmunitionValue = useRecoilValue(hasEnoughAmmunition);
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isHealthLowValue = useRecoilValue(isHealthLow);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isAutomincerEquipped = useRecoilValue(isRelicEquipped("automincer"));
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const locationValue = useRecoilValue(location);

  const toggleAttacking = useToggleAttacking();

  const pulseAnimation = getAnimationClass({
    animation: "pulse",
    isInfinite: true,
  });
  const isResting =
    hasFlatlinedValue ||
    isStageCompletedValue ||
    locationValue === "caravan" ||
    encounterValue === "void";
  const showWarning = isAttackingValue && isHealthLowValue && !isMonsterDeadValue && !isResting;

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
          areAttributesAffordableValue ||
          !hasEnoughAmmunitionValue ||
          isHealthLowValue ||
          isMonsterDeadValue
            ? undefined
            : pulseAnimation,
        Icon: IconAttack,
        tooltip: "Attack",
      };
    })();

  return (
    <OverlayTrigger
      overlay={
        showWarning ? (
          <Popover>
            <PopoverHeader className="text-center">
              <span>Low&nbsp;</span>

              <IconImage className="small" Icon={IconHealth} />

              <span>&nbsp;health</span>
            </PopoverHeader>

            <PopoverBody>
              <span>&quot;The meaning of life is that it ends.&quot;</span>
            </PopoverBody>
          </Popover>
        ) : (
          <Tooltip>
            <span>{tooltip}</span>
          </Tooltip>
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

          {isAutomincerEquipped && !isResting && (
            <Badge bg="secondary" className="position-absolute top-50 start-100 translate-middle">
              <IconImage className="small" Icon={IconGrinding} />
            </Badge>
          )}
        </Button>
      </div>
    </OverlayTrigger>
  );
}
