import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { SellItem } from "@neverquest/components/Caravan/Merchant/SellItem";
import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { Trinket } from "@neverquest/components/Items/Trinkets";
import { inventory } from "@neverquest/state/inventory";
import {
  isArmor,
  isConsumable,
  isGear,
  isGem,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { stackItems } from "@neverquest/utilities/helpers";

export function SellItems() {
  const inventoryValue = useRecoilValue(inventory);

  const equippedGear = [
    ...inventoryValue.filter((current) => isGear(current) && current.isEquipped),
  ];
  const storedItems = inventoryValue.filter(
    (current) => !isGear(current) || (isGear(current) && !current.isEquipped),
  );

  return (
    <Stack gap={3}>
      <h6>Sell items</h6>

      {inventoryValue.length === 0 ? (
        <span className="fst-italic">Nothing to sell.</span>
      ) : (
        <Stack gap={3}>
          {[equippedGear.find(isWeapon), equippedGear.find(isArmor), equippedGear.find(isShield)]
            .filter(isGear)
            .map((current) => {
              const { id, isEquipped } = current;

              return (
                <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
                  <Stack direction="horizontal">
                    <ItemDisplay item={current} overlayPlacement="right" />

                    {isEquipped && (
                      <span className="fst-italic" style={{ width: "max-content" }}>
                        &nbsp;(Equipped)
                      </span>
                    )}
                  </Stack>

                  <SellItem item={current} />
                </div>
              );
            })}

          {storedItems
            .filter(isGear)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((current) => (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={current.id}>
                <ItemDisplay item={current} overlayPlacement="right" />

                <SellItem item={current} />
              </div>
            ))}

          {storedItems
            .filter(isTrinket)
            .sort((a, b) => a.type.localeCompare(b.type))
            .map((current) => (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={current.id}>
                <Trinket item={current} />

                <SellItem item={current} />
              </div>
            ))}

          {[
            ...stackItems(
              storedItems.filter(isConsumable).sort((a, b) => a.type.localeCompare(b.type)),
            ),
            ...stackItems(storedItems.filter(isGem).sort((a, b) => a.type.localeCompare(b.type))),
          ].map((current) => {
            const { item, stack } = current;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={item.id}>
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
