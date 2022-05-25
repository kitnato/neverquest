import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useAtom } from "jotai";

import InventoryElement from "neverquest/components/Inventory/InventoryElement";
import Coins from "neverquest/components/Loot/Coins";
import useReserve from "neverquest/hooks/useReserve";
import useUnequipItem from "neverquest/hooks/useUnequipItem";
import { inventory } from "neverquest/state/inventory";
import { InventoryContentProps } from "neverquest/types/props";
import { UIVariant } from "neverquest/types/ui";
import { getSellPrice } from "neverquest/utilities/helpers";

export default function SellItems() {
  const setReserve = useReserve();
  const unequipItem = useUnequipItem();
  const [inventoryValue, setInventory] = useAtom(inventory);

  const inventoryContents = Object.entries(inventoryValue);

  const sellItem =
    ({ isEquipped, item, key }: InventoryContentProps) =>
    () => {
      if (isEquipped) {
        unequipItem({ item, key });
      }

      setInventory((current) => {
        const newInventoryContents = { ...current };

        delete newInventoryContents[key];

        return newInventoryContents;
      });

      setReserve({ coinsDifference: getSellPrice(item) });
    };

  return (
    <Stack gap={3}>
      <h6>Sell items</h6>

      {inventoryContents.length === 0 ? (
        <span className="fst-italic">Nothing to sell.</span>
      ) : (
        <Stack gap={3}>
          {inventoryContents.map(([key, { isEquipped, item }]) => (
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
                <Button onClick={sellItem({ isEquipped, item, key })} variant={UIVariant.Outline}>
                  Sell
                </Button>
              </Col>
            </Row>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
