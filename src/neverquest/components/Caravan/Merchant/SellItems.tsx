import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useAtom } from "jotai";

import InventoryElement from "neverquest/components/Inventory/InventoryElement";
import Coins from "neverquest/components/Resource/Coins";
import useResource from "neverquest/hooks/useResource";
import useUnequipItem from "neverquest/hooks/useUnequipItem";
import { inventory } from "neverquest/state/inventory";
import { InventoryProps } from "neverquest/types/props";
import { UIVariant } from "neverquest/types/ui";
import { getSellPrice } from "neverquest/utilities/helpers";

export default function SellItems() {
  const setResource = useResource();
  const unequipItem = useUnequipItem();
  const [inventoryValue, setInventory] = useAtom(inventory);

  const inventoryIDs = Object.getOwnPropertySymbols(inventoryValue);

  const sellItem =
    ({ id, isEquipped, item }: InventoryProps & { isEquipped: boolean | undefined }) =>
    () => {
      // TODO - make equipment slots dependent on inventory, remove isEquipped requirement.
      if (isEquipped) {
        unequipItem({ id, item });
      }

      setInventory((current) => {
        const newInventoryContents = { ...current };

        delete newInventoryContents[id];

        return newInventoryContents;
      });

      setResource({ coinsDifference: getSellPrice(item) });
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
                  <Button onClick={sellItem({ id, isEquipped, item })} variant={UIVariant.Outline}>
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
