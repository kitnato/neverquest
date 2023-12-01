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

  const equippedGear = inventoryValue.filter(
    (current) => isGearItem(current) && current.isEquipped,
  );
  const storedItems = inventoryValue.filter(
    (current) => !isGearItem(current) || (isGearItem(current) && !current.isEquipped),
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
            .map((current) => {
              const { ID, isEquipped } = current;

              return (
                <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
                  <Stack direction="horizontal" gap={1}>
                    <ItemDisplay
                      description={isEquipped ? "Equipped" : undefined}
                      isInInventory
                      item={current}
                    />
                  </Stack>

                  <SellItem item={current} />
                </div>
              );
            })}

          {storedItems
            .filter(isGearItem)
            .toSorted((current1, current2) => current1.name.localeCompare(current2.name))
            .map((current) => (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={current.ID}>
                <ItemDisplay isInInventory item={current} />

                <SellItem item={current} />
              </div>
            ))}

          {storedItems
            .filter(isUsable)
            .toSorted((current1, current2) => current1.name.localeCompare(current2.name))
            .map((current) => (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={current.ID}>
                <Usable item={current} />

                <SellItem item={current} />
              </div>
            ))}

          {[
            ...stackItems(
              storedItems
                .filter(isConsumableItem)
                .toSorted((current1, current2) => current1.name.localeCompare(current2.name)),
            ),
            ...stackItems(
              storedItems
                .filter(isGemItem)
                .toSorted((current1, current2) => current1.name.localeCompare(current2.name)),
            ),
          ].map((current) => {
            const { item, stack } = current;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={item.ID}>
                <ItemDisplay item={item} stack={stack} />

                <SellItem item={item} />
              </div>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
