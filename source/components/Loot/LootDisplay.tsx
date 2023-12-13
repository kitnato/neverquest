import { Card, CardBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { EssenceLoot } from "@neverquest/components/Loot/EssenceLoot";
import IconLooted from "@neverquest/icons/looted.svg?react";
import { hasLooted, isLootAvailable, itemsLoot } from "@neverquest/state/resources";
import { isGearItem, isStackableItem, isTrinketItem } from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";
import { stackItems } from "@neverquest/utilities/helpers";

export function LootDisplay() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isLootAvailableValue = useRecoilValue(isLootAvailable);
  const itemsLootValue = useRecoilValue(itemsLoot);

  if (isLootAvailableValue) {
    return (
      <Card className={getAnimationClass({ animation: "flipInX" })}>
        <CardBody>
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
                    .filter(isGearItem)
                    .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
                ),
                ...stackItems(
                  itemsLootValue
                    .filter(isTrinketItem)
                    .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
                ),
                ...stackItems(
                  itemsLootValue
                    .filter(isStackableItem)
                    .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
                ),
              ].map(({ amount, item }) => (
                <ItemDisplay amount={amount} item={item} key={item.ID} />
              ))}
            </Stack>
          )}
        </CardBody>
      </Card>
    );
  }
}
