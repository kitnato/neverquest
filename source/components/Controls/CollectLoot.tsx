import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { useCollectLoot } from "@neverquest/hooks/actions/useCollectLoot";
import IconLoot from "@neverquest/icons/loot.svg?react";
import { isAttacking, isGameOver } from "@neverquest/state/character";
import { isStageCompleted, location, progressMaximum } from "@neverquest/state/encounter";
import { isLootAvailable } from "@neverquest/state/resources";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function CollectLoot() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isLootAvailableValue = useRecoilValue(isLootAvailable);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const locationValue = useRecoilValue(location);
  const progressMaximumValue = useRecoilValue(progressMaximum);

  const collectLoot = useCollectLoot();

  if (
    isLootAvailableValue &&
    (progressMaximumValue === Number.POSITIVE_INFINITY || isStageCompletedValue) &&
    locationValue === "wilderness"
  ) {
    return (
      <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>}>
        <div className={getAnimationClass({ animation: "bounceIn" })}>
          <Button
            className={
              isStageCompletedValue
                ? `${getAnimationClass({ animation: "pulse", isInfinite: true })}`
                : undefined
            }
            disabled={isAttackingValue || isGameOverValue}
            onClick={collectLoot}
            variant="outline-dark"
          >
            <IconImage Icon={IconLoot} />
          </Button>
        </div>
      </OverlayTrigger>
    );
  }
}
