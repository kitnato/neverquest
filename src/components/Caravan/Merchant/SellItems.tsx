import { nanoid } from "nanoid";
import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Coins } from "@neverquest/components/Resources/Coins";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/constants";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { merchantInventory } from "@neverquest/state/caravan";
import { equippedItemIDs, inventory } from "@neverquest/state/inventory";

import { getSellPrice } from "@neverquest/utilities/getters";

export function SellItems() {
  const [inventoryValue, setInventory] = useRecoilState(inventory);
  const equippedItemIDValues = useRecoilValue(equippedItemIDs);
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  const [sellConfirmation, setSellConfirmation] = useState<string | null>(null);

  const transactResources = useTransactResources();

  const inventoryIDs = Object.getOwnPropertyNames(inventoryValue);

  const sellPossession = (id: string) => {
    const item = inventoryValue[id];

    setInventory((current) => {
      const newInventoryContents = { ...current };

      Reflect.deleteProperty(newInventoryContents, id);

      return newInventoryContents;
    });
    setMerchantInventory((current) => ({
      ...current,
      [nanoid()]: { isReturned: true, item },
    }));
    transactResources({ coinsDifference: getSellPrice(item) });
  };

  return (
    <Stack gap={3}>
      <h6>Sell items</h6>

      {inventoryIDs.length === 0 ? (
        <span className="fst-italic">Nothing to sell.</span>
      ) : (
        <Stack gap={3}>
          {inventoryIDs.map((id) => {
            const isEquipped = equippedItemIDValues.includes(id);
            const item = inventoryValue[id];

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
                <Stack direction="horizontal">
                  <ItemDisplay item={item} overlayPlacement="right" />

                  {isEquipped && (
                    <span className="fst-italic" style={{ width: "max-content" }}>
                      &nbsp;(Equipped)
                    </span>
                  )}
                </Stack>

                <Stack direction="horizontal" gap={3}>
                  <Coins tooltip="Value (coins)" value={getSellPrice(item)} />

                  <Button
                    onClick={() => {
                      if (isEquipped) {
                        setSellConfirmation(id);
                      } else {
                        sellPossession(id);
                      }
                    }}
                    variant="outline-dark"
                  >
                    Sell
                  </Button>
                </Stack>
              </div>
            );
          })}

          {sellConfirmation !== null && (
            <ConfirmationDialog
              confirmationLabel="Sell"
              message={`
                It can be bought back at the original purchase coinPrice
                but it will be gone forever once leaving the caravan.
              `}
              onConfirm={() => sellPossession(sellConfirmation)}
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
