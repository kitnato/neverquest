import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilState, useSetRecoilState } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { merchantInventory } from "@neverquest/state/caravan";
import { inventory } from "@neverquest/state/inventory";
import type { Item } from "@neverquest/types";
import { isGear } from "@neverquest/types/type-guards";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { getSellPrice } from "@neverquest/utilities/getters";

export function SellItems() {
  const [inventoryValue, setInventory] = useRecoilState(inventory);
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  const [sellConfirmation, setSellConfirmation] = useState<Item | null>(null);

  const toggleEquipGear = useToggleEquipGear();
  const transactResources = useTransactResources();

  const sellItem = (item: Item) => {
    if (isGear(item)) {
      toggleEquipGear(item);
    }

    setInventory((current) => current.filter(({ id }) => id !== item.id));

    setMerchantInventory((current) => current.concat({ isReturned: true, item }));
    transactResources({ coinsDifference: getSellPrice(item) });
  };

  return (
    <Stack gap={3}>
      <h6>Sell items</h6>

      {inventoryValue.length === 0 ? (
        <span className="fst-italic">Nothing to sell.</span>
      ) : (
        <Stack gap={3}>
          {inventoryValue.map((item) => {
            const isEquipped = isGear(item) && item.isEquipped;

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

                <Stack direction="horizontal" gap={3}>
                  <ResourceDisplay
                    tooltip="Value (coins)"
                    type="coins"
                    value={getSellPrice(item)}
                  />

                  <Button
                    onClick={() => {
                      if (isEquipped) {
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
              </div>
            );
          })}

          {sellConfirmation !== null && (
            <ConfirmationDialog
              confirmationLabel="Sell"
              message={`
                It can be bought back at the original purchase price
                but it will be gone forever once leaving the caravan.
              `}
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
