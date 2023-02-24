import { nanoid } from "nanoid";
import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilState, useSetRecoilState } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { InventoryElement } from "@neverquest/components/Inventory/InventoryElement";
import { Coins } from "@neverquest/components/Resource/Coins";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/constants";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { merchantInventory } from "@neverquest/state/caravan";
import { inventory } from "@neverquest/state/inventory";
import { UIVariant } from "@neverquest/types/ui";
import { getSellPrice } from "@neverquest/utilities/getters";

export function SellItems() {
  const [inventoryValue, setInventory] = useRecoilState(inventory);
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  const [sellConfirmation, setSellConfirmation] = useState<string | null>(null);

  const transactResources = useTransactResources();

  const inventoryIDs = Object.getOwnPropertyNames(inventoryValue);

  const sellPossession = (id: string) => {
    const { item, key } = inventoryValue[id];

    setInventory((current) => {
      const newInventoryContents = { ...current };

      delete newInventoryContents[id];

      return newInventoryContents;
    });
    setMerchantInventory((current) => ({
      ...current,
      [nanoid()]: { isReturned: true, item, key },
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
            const { isEquipped, item, key } = inventoryValue[id];

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={key}>
                <Stack direction="horizontal">
                  <InventoryElement item={item} />

                  {isEquipped && (
                    <span className="fst-italic" style={{ width: "max-content" }}>
                      &nbsp;(Equipped)
                    </span>
                  )}
                </Stack>

                <Stack direction="horizontal" gap={3}>
                  <Coins tooltip="Value (coins)" value={getSellPrice(item)} />

                  <Button
                    onClick={({ currentTarget }) => {
                      currentTarget.blur();

                      if (isEquipped) {
                        setSellConfirmation(id);
                      } else {
                        sellPossession(id);
                      }
                    }}
                    variant={UIVariant.Outline}
                  >
                    Sell
                  </Button>
                </Stack>
              </div>
            );
          })}

          {sellConfirmation && (
            <ConfirmationDialog
              confirmationLabel="Sell"
              message={`
                It can be bought back at the original purchase price
                but it will be gone forever once leaving the caravan.
              `}
              onConfirm={() => sellPossession(sellConfirmation)}
              setHide={() => setSellConfirmation(null)}
              show={sellConfirmation !== null}
              title="Sell equipped item?"
            />
          )}
        </Stack>
      )}
    </Stack>
  );
}
