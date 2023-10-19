import { Card, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { EssenceLoot } from "@neverquest/components/Loot/EssenceLoot";
import { Looting } from "@neverquest/components/Loot/Looting";
import { ReactComponent as IconLooted } from "@neverquest/icons/looted.svg";
import { progress } from "@neverquest/state/encounter";
import { hasLooted, itemsLoot } from "@neverquest/state/resources";
import { isGear, isStackable, isTrinket } from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";
import { stackItems } from "@neverquest/utilities/helpers";

export function Loot() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const itemsLootValue = useRecoilValue(itemsLoot);
  const progressValue = useRecoilValue(progress);

  const stackItemsLoot = [
    ...stackItems(
      itemsLootValue
        .filter(isGear)
        .sort((current1, current2) => current1.name.localeCompare(current2.name)),
    ),
    ...stackItems(
      itemsLootValue
        .filter(isTrinket)
        .sort((current1, current2) => current1.name.localeCompare(current2.name)),
    ),
    ...stackItems(
      itemsLootValue
        .filter(isStackable)
        .sort((current1, current2) => current1.name.localeCompare(current2.name)),
    ),
  ];

  return (
    <Stack gap={3}>
      <Looting />

      {progressValue > 0 && (
        <Card className={getAnimationClass({ name: "flipInX" })}>
          <Card.Body>
            {hasLootedValue && itemsLootValue.length === 0 ? (
              <IconDisplay
                contents={<span className="fst-italic">Nothing remains.</span>}
                Icon={IconLooted}
                isSpaced
                tooltip="Loot"
              />
            ) : (
              <Stack gap={3}>
                {!hasLootedValue && <EssenceLoot />}

                {stackItemsLoot.map(({ item, stack }) => (
                  <ItemDisplay item={item} key={item.id} stack={stack} />
                ))}
              </Stack>
            )}
          </Card.Body>
        </Card>
      )}
    </Stack>
  );
}
