import { MouseEvent, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import ConfirmationDialog from "neverquest/components/ConfirmationDialog";
import InventoryElement from "neverquest/components/Inventory/InventoryElement";
import Coins from "neverquest/components/Resource/Coins";
import { inventory } from "neverquest/state/inventory";
import { resourcesBalance } from "neverquest/state/resources";
import { UIVariant } from "neverquest/types/ui";
import { getSellPrice } from "neverquest/utilities/helpers";

export default function SellItems() {
  const [inventoryValue, setInventory] = useAtom(inventory);
  const balanceResources = useSetAtom(resourcesBalance);

  const [sellConfirmation, setSellConfirmation] = useState<symbol | null>(null);

  const inventoryIDs = Object.getOwnPropertySymbols(inventoryValue);

  const sellItem = (id: symbol) => {
    const { item } = inventoryValue[id];

    setInventory((current) => {
      const newInventoryContents = { ...current };

      delete newInventoryContents[id];

      return newInventoryContents;
    });

    balanceResources({ coinsDifference: getSellPrice(item) });
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
                <Col xs={8}>
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
              message={`This will remove ${inventoryValue[sellConfirmation].item.name}.`}
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
