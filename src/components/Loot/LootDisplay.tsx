import { Card, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { EssenceLoot } from "@neverquest/components/Loot/EssenceLoot";
import IconLooted from "@neverquest/icons/looted.svg?react";
import { hasLooted, isLootAvailable, itemsLoot } from "@neverquest/state/resources";
import { isGear, isStackable, isTrinket } from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";
import { stackItems } from "@neverquest/utilities/helpers";

export function LootDisplay() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isLootAvailableValue = useRecoilValue(isLootAvailable);
  const itemsLootValue = useRecoilValue(itemsLoot);

  if (!isLootAvailableValue) {
    return null;
  }

  return (
    <Card className={getAnimationClass({ name: "flipInX" })}>
      <Card.Body>
        {hasLootedValue ? (
          <IconDisplay gap={5} Icon={IconLooted} tooltip="Loot">
            <span className="fst-italic">Nothing remains.</span>
          </IconDisplay>
        ) : (
          <Stack gap={3}>
            <EssenceLoot />

            {[
              ...stackItems(
                itemsLootValue
                  .filter(isGear)
                  .toSorted((current1, current2) => current1.name.localeCompare(current2.name)),
              ),
              ...stackItems(
                itemsLootValue
                  .filter(isTrinket)
                  .toSorted((current1, current2) => current1.name.localeCompare(current2.name)),
              ),
              ...stackItems(
                itemsLootValue
                  .filter(isStackable)
                  .toSorted((current1, current2) => current1.name.localeCompare(current2.name)),
              ),
            ].map(({ item, stack }) => (
              <ItemDisplay item={item} key={item.id} stack={stack} />
            ))}
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}