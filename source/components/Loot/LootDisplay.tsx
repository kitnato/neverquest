import { Card, CardBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay"
import { EssenceLoot } from "@neverquest/components/Loot/EssenceLoot"
import IconLooted from "@neverquest/icons/looted.svg?react"
import { progress } from "@neverquest/state/encounter"
import { isLootAvailable, itemsLoot } from "@neverquest/state/resources"
import {
  isGearItem,
  isInfusableItem,
  isRelicItem,
  isStackableItem,
} from "@neverquest/types/type-guards"
import { getAnimationClass } from "@neverquest/utilities/getters"
import { stackItems } from "@neverquest/utilities/helpers"

export function LootDisplay() {
  const progressValue = useRecoilValue(progress)
  const isLootAvailableValue = useRecoilValue(isLootAvailable)
  const itemsLootValue = useRecoilValue(itemsLoot)

  if (progressValue > 0) {
    return (
      <Card>
        <CardBody>
          {isLootAvailableValue ? (
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
                    .filter(isInfusableItem)
                    .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
                ),
                ...stackItems(
                  itemsLootValue
                    .filter(isRelicItem)
                    .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
                ),
                ...stackItems(
                  itemsLootValue
                    .filter(isStackableItem)
                    .toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
                ),
              ].map(({ amount, item }) => (
                <div className={getAnimationClass({ animation: `flipInX` })} key={item.ID}>
                  <ItemDisplay amount={amount} item={item} />
                </div>
              ))}
            </Stack>
          ) : (
            <IconDisplay
              className={getAnimationClass({ animation: `flipInX` })}
              gap={5}
              Icon={IconLooted}
              tooltip="Loot"
            >
              <span className="fst-italic">Nothing remains.</span>
            </IconDisplay>
          )}
        </CardBody>
      </Card>
    )
  }
}
