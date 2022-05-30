import { useAtom, useSetAtom } from "jotai";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import InventoryElement from "neverquest/components/Inventory/InventoryElement";
import Coins from "neverquest/components/Resource/Coins";
import { inventory } from "neverquest/state/inventory";
import { resourcesBalance } from "neverquest/state/resources";
import { InventoryProps } from "neverquest/types/props";
import { UIVariant } from "neverquest/types/ui";
import { getSellPrice } from "neverquest/utilities/helpers";

export default function SellItems() {
  const balanceResources = useSetAtom(resourcesBalance);
  const [inventoryValue, setInventory] = useAtom(inventory);

  const inventoryIDs = Object.getOwnPropertySymbols(inventoryValue);

  const sellItem =
    ({ id, item }: InventoryProps) =>
    () => {
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
                  <Button onClick={sellItem({ id, item })} variant={UIVariant.Outline}>
                    Sell
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
