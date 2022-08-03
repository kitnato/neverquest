import { MouseEvent, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilState, useSetRecoilState } from "recoil";

import ConfirmationDialog from "@neverquest/components/ConfirmationDialog";
import InventoryElement from "@neverquest/components/Inventory/InventoryElement";
import Coins from "@neverquest/components/Resource/Coins";
import { merchantInventory } from "@neverquest/state/caravan";
import { inventory } from "@neverquest/state/inventory";
import { resourcesBalance } from "@neverquest/state/transactions";
import { UIVariant } from "@neverquest/types/ui";
import { getSellPrice } from "@neverquest/utilities/helpers";

export default function SellItems() {
  const [inventoryValue, setInventory] = useRecoilState(inventory);
  const setMerchantInventory = useSetRecoilState(merchantInventory);
  const balanceResources = useSetRecoilState(resourcesBalance);

  const [sellConfirmation, setSellConfirmation] = useState<symbol | null>(null);

  const inventoryIDs = Object.getOwnPropertySymbols(inventoryValue);

  const sellItem = (id: symbol) => {
    const { item, key } = inventoryValue[id];

    setInventory((current) => {
      const newInventoryContents = { ...current };

      delete newInventoryContents[id];

      return newInventoryContents;
    });
    balanceResources({ coinsDifference: getSellPrice(item) });
    setMerchantInventory((current) => ({
      ...current,
      [Symbol()]: { isReturned: true, item, key },
    }));
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
              <div className="align-items-center d-flex justify-content-between w-100" key={key}>
                <Stack direction="horizontal">
                  <InventoryElement item={item} />

                  {isEquipped && (
                    <span className="fst-italic" style={{ width: "max-content" }}>
                      &nbsp;(Equipped)
                    </span>
                  )}
                </Stack>

                <Stack direction="horizontal" gap={3}>
                  <Coins tooltip="Price (coins)" value={getSellPrice(item)} />

                  <Button
                    onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
                      currentTarget.blur();

                      if (isEquipped) {
                        setSellConfirmation(id);
                      } else {
                        sellItem(id);
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
              onConfirm={() => sellItem(sellConfirmation)}
              message={`
                You can buy it back at the original purchase price
                but it will be gone forever once you leave the caravan.
              `}
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
