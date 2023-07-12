import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { merchantInventory } from "@neverquest/state/caravan";
import { inventory } from "@neverquest/state/inventory";
import { confirmationWarnings } from "@neverquest/state/settings";
import type { Item } from "@neverquest/types";
import {
  isArmor,
  isConsumable,
  isGear,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { getSellPrice } from "@neverquest/utilities/getters";

export function SellItems() {
  const confirmationWarningsValue = useRecoilValue(confirmationWarnings);
  const [inventoryValue, setInventory] = useRecoilState(inventory);
  const [merchantInventoryValue, setMerchantInventory] = useRecoilState(merchantInventory);

  const [sellConfirmation, setSellConfirmation] = useState<Item | null>(null);

  const toggleEquipGear = useToggleEquipGear();
  const transactResources = useTransactResources();

  const sellItem = (item: Item) => {
    if (isGear(item)) {
      toggleEquipGear(item);
    }

    if (isConsumable(item)) {
      const { stack, type } = item;

      if (stack === 1) {
        setInventory((current) => current.filter(({ id }) => id !== item.id));
      } else {
        const stackIndex = inventoryValue.findIndex(
          (item) => isConsumable(item) && item.type === type
        );

        setInventory((current) => [
          ...current.slice(0, stackIndex),
          { ...item, stack: stack - 1 },
          ...current.slice(stackIndex + 1),
        ]);
      }

      const merchantStack = merchantInventoryValue.find(
        ({ item }) => isConsumable(item) && item.type === type
      );

      if (merchantStack === undefined) {
        setMerchantInventory((current) =>
          current.concat({ isReturned: true, item: { ...item, stack: 1 } })
        );
      } else if (isConsumable(merchantStack.item)) {
        const merchantStackIndex = merchantInventoryValue.findIndex(
          ({ item }) => isConsumable(item) && item.type === type
        );
        const { item: merchantItem } = merchantStack;

        setMerchantInventory((current) => [
          ...current.slice(0, merchantStackIndex),
          { isReturned: true, item: { ...merchantItem, stack: merchantItem.stack + 1 } },
          ...current.slice(merchantStackIndex + 1),
        ]);
      }
    } else {
      setInventory((current) => current.filter(({ id }) => id !== item.id));
      setMerchantInventory((current) => current.concat({ isReturned: true, item }));
    }

    transactResources({ coinsDifference: getSellPrice(item) });
  };

  const equippedGear = [...inventoryValue.filter((item) => isGear(item) && item.isEquipped)];
  const storedItems = inventoryValue.filter(
    (item) => !isGear(item) || (isGear(item) && !item.isEquipped)
  );

  const SellItem = ({ item, showConfirmation }: { item: Item; showConfirmation?: boolean }) => (
    <Stack direction="horizontal" gap={3}>
      <ResourceDisplay tooltip="Value (coins)" type="coins" value={getSellPrice(item)} />

      <Button
        onClick={() => {
          if (confirmationWarningsValue && showConfirmation) {
            setSellConfirmation(item);
          } else {
            sellItem(item);
          }
        }}
        variant="outline-dark"
      >
        Sell
      </Button>
    </Stack>
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
            .map((item) => {
              const { isEquipped } = item;

              return (
                <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={item.id}>
                  <Stack direction="horizontal">
                    <ItemDisplay item={item} overlayPlacement="right" />

                    {isEquipped && (
                      <span className="fst-italic" style={{ width: "max-content" }}>
                        &nbsp;(Equipped)
                      </span>
                    )}
                  </Stack>

                  <SellItem item={item} showConfirmation={isEquipped} />
                </div>
              );
            })}

          {storedItems
            .filter(isGear)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => {
              return (
                <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={item.id}>
                  <ItemDisplay item={item} overlayPlacement="right" />

                  <SellItem item={item} />
                </div>
              );
            })}

          {[...storedItems.filter(isTrinket), ...storedItems.filter(isConsumable)]
            .sort((a, b) => a.type.localeCompare(b.type))
            .map((item) => {
              return (
                <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={item.id}>
                  <ItemDisplay item={item} overlayPlacement="right" />

                  <SellItem item={item} />
                </div>
              );
            })}

          {sellConfirmation !== null && (
            <ConfirmationDialog
              confirmationLabel="Sell"
              message="It can be bought back at the original purchase price but it will be gone forever once leaving the caravan."
              onConfirm={() => sellItem(sellConfirmation)}
              setHide={() => setSellConfirmation(null)}
              show={Boolean(sellConfirmation)}
              title="Sell equipped item?"
            />
          )}
        </Stack>
      )}
    </Stack>
  );
}
