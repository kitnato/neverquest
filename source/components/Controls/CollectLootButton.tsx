import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { useCollectLoot } from "@neverquest/hooks/actions/useCollectLoot";
import IconLoot from "@neverquest/icons/loot.svg?react";
import { isGameOver } from "@neverquest/state/character";
import { isStageCompleted, location } from "@neverquest/state/encounter";
import { hasLooted, itemsLoot } from "@neverquest/state/resources";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function CollectLootButton() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const locationValue = useRecoilValue(location);
  const itemsLootValue = useRecoilValue(itemsLoot);

  const gatherLoot = useCollectLoot();

  if (
    (!hasLootedValue || itemsLootValue.length > 0) &&
    isStageCompletedValue &&
    locationValue === "wilderness"
  ) {
    return (
      <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>}>
        <div className={getAnimationClass({ animation: "bounceIn" })}>
          <Button
            className={
              hasLootedValue
                ? undefined
                : `${getAnimationClass({ animation: "pulse", isInfinite: true })}`
            }
            disabled={isGameOverValue}
            onClick={gatherLoot}
            variant="outline-dark"
          >
            <IconImage Icon={IconLoot} />
          </Button>
        </div>
      </OverlayTrigger>
    );
  }
}
