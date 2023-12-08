import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { SellItem } from "@neverquest/components/Caravan/Merchant/SellItem";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Usable } from "@neverquest/components/Inventory/Usable";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import { inventory } from "@neverquest/state/inventory";
import {
  isArmor,
  isConsumableItem,
  isGearItem,
  isGemItem,
  isShield,
  isUsable,
  isWeapon,
} from "@neverquest/types/type-guards";
import { stackItems } from "@neverquest/utilities/helpers";

export function SellItems() {
  const inventoryValue = useRecoilValue(inventory);

  const equippedGear = inventoryValue.filter((item) => isGearItem(item) && item.isEquipped);
  const storedItems = inventoryValue.filter(
    (item) => !isGearItem(item) || (isGearItem(item) && !item.isEquipped),
  );

  return (
    <Stack gap={3}>
      <h6>Sell items</h6>

      {inventoryValue.length === 0 ? (
        <span className="fst-italic">Nothing to sell.</span>
      ) : (
        <Stack gap={3}>
          {[equippedGear.find(isWeapon), equippedGear.find(isArmor), equippedGear.find(isShield)]
            .filter(isGearItem)
            .map((gearItem) => {
              const { ID, isEquipped } = gearItem;

              return (
                <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
                  <Stack direction="horizontal" gap={1}>
                    <ItemDisplay
                      description={isEquipped ? "Equipped" : undefined}
                      isInInventory
                      item={gearItem}
                    />
                  </Stack>

                  <SellItem item={gearItem} />
                </div>
              );
            })}

          {storedItems
            .filter(isGearItem)
            .toSorted((gearItem1, gearItem2) => gearItem1.name.localeCompare(gearItem2.name))
            .map((gearItem) => (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={gearItem.ID}>
                <ItemDisplay isInInventory item={gearItem} />

                <SellItem item={gearItem} />
              </div>
            ))}

          {storedItems
            .filter(isUsable)
            .toSorted((usableItem1, usableItem2) =>
              usableItem1.name.localeCompare(usableItem2.name),
            )
            .map((usableItem) => (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={usableItem.ID}>
                <Usable item={usableItem} />

                <SellItem item={usableItem} />
              </div>
            ))}

          {[
            ...stackItems(
              storedItems
                .filter(isConsumableItem)
                .toSorted((consumableItem1, consumableItem2) =>
                  consumableItem1.name.localeCompare(consumableItem2.name),
                ),
            ),
            ...stackItems(
              storedItems
                .filter(isGemItem)
                .toSorted((gemItem1, gemItem2) => gemItem1.name.localeCompare(gemItem2.name)),
            ),
          ].map((currentStack) => {
            const { amount, item } = currentStack;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={item.ID}>
                <ItemDisplay amount={amount} item={item} />

                <SellItem item={item} />
              </div>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
