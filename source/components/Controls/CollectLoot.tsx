import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconLoot from "@neverquest/icons/loot.svg?react";
import { isAttacking, isGameOver } from "@neverquest/state/character";
import { isStageCompleted, location, progressMaximum } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { essenceLoot, hasLooted, isLootAvailable, itemsLoot } from "@neverquest/state/resources";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function CollectLoot() {
  const [itemsLootValue, setItemsLoot] = useRecoilState(itemsLoot);
  const essenceLootValue = useRecoilValue(essenceLoot);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isLootAvailableValue = useRecoilValue(isLootAvailable);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const locationValue = useRecoilValue(location);
  const progressMaximumValue = useRecoilValue(progressMaximum);
  const resetEssenceLoot = useResetRecoilState(essenceLoot);
  const setHasLooted = useSetRecoilState(hasLooted);
  const setIsShowingAttributes = useSetRecoilState(isShowing("attributes"));

  const acquireItem = useAcquireItem();
  const progressQuest = useProgressQuest();
  const transactEssence = useTransactEssence();

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
            onClick={() => {
              transactEssence(essenceLootValue);

              setIsShowingAttributes(true);

              if (itemsLootValue.length > 0) {
                const acquiredItems = itemsLootValue.filter(
                  (item) => acquireItem(item) === "success",
                );
                const acquiredItemIDs = new Set(acquiredItems.map(({ ID }) => ID));

                setItemsLoot((currentItemsLoot) =>
                  currentItemsLoot.filter(({ ID }) => !acquiredItemIDs.has(ID)),
                );
              }

              resetEssenceLoot();
              setHasLooted(true);

              progressQuest({ quest: "looting" });
            }}
            variant="outline-dark"
          >
            <IconImage Icon={IconLoot} />
          </Button>
        </div>
      </OverlayTrigger>
    );
  }
}
