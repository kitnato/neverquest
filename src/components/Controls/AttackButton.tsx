import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { useToggleAttack } from "@neverquest/hooks/actions/useToggleAttack";
import { ReactComponent as IconAttack } from "@neverquest/icons/attack.svg";
import { ReactComponent as IconResting } from "@neverquest/icons/resting.svg";
import { ReactComponent as IconRetreat } from "@neverquest/icons/retreat.svg";
import { areAttributesIncreasable } from "@neverquest/state/attributes";
import { hasEnoughAmmunition, isAttacking, isGameOver } from "@neverquest/state/character";
import { isStageCompleted, isWilderness } from "@neverquest/state/encounter";
import { isHealthLow } from "@neverquest/state/reserves";
import { lowHealthWarning } from "@neverquest/state/settings";
import type { SVGIcon } from "@neverquest/types/props";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function AttackButton() {
  const areAttributesIncreasableValue = useRecoilValue(areAttributesIncreasable);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isHealthLowValue = useRecoilValue(isHealthLow);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const hasEnoughAmmunitionValue = useRecoilValue(hasEnoughAmmunition);
  const showLowHealthWarningValue = useRecoilValue(lowHealthWarning);

  const toggleAttack = useToggleAttack();

  const pulseAnimation = getAnimationClass({
    isInfinite: true,
    name: "pulse",
  });
  const isResting = isGameOverValue || isStageCompletedValue || !isWildernessValue;
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
        tooltip: hasEnoughAmmunitionValue ? "Attack" : "Insufficient ammunition!",
      };
    })();

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
        <span className={getAnimationClass({ name: "bounceIn" })}>
          <Button
            className={animation}
            disabled={isResting || !hasEnoughAmmunitionValue}
            onClick={toggleAttack}
            variant="outline-dark"
          >
            <IconImage Icon={Icon} />
          </Button>
        </span>
      </OverlayTrigger>
    </>
  );
}
