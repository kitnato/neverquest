import { MouseEvent, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { Button, Col, Row, Stack } from "react-bootstrap";

import ConfirmationDialog from "@neverquest/components/ConfirmationDialog";
import InventoryElement from "@neverquest/components/Inventory/InventoryElement";
import Coins from "@neverquest/components/Resource/Coins";
import { merchantInventory } from "@neverquest/state/caravan";
import { inventory } from "@neverquest/state/inventory";
import { resourcesBalance } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";
import { getSellPrice } from "@neverquest/utilities/helpers";

export default function SellItems() {
  const [inventoryValue, setInventory] = useAtom(inventory);
  const setMerchantInventory = useSetAtom(merchantInventory);
  const balanceResources = useSetAtom(resourcesBalance);

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
              <Row key={key}>
                <Col>
                  <Stack direction="horizontal" gap={1}>
                    <InventoryElement item={item} />

                    {isEquipped && <span className="fst-italic">(Equipped)</span>}
                  </Stack>
                </Col>

                <Col>
                  <Coins tooltip="Price (coins)" value={getSellPrice(item)} />
                </Col>

                <Col>
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
                </Col>
              </Row>
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