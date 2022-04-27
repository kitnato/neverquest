import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue } from "recoil";

import InventoryElement from "neverquest/components/Inventory/InventoryElement";
import Coins from "neverquest/components/Loot/Coins";
import { InventoryContents, UIVariant } from "neverquest/env";
import useReserve from "neverquest/hooks/useReserve";
import useUnequipItem from "neverquest/hooks/useUnequipItem";
import { equippedInventory, storedInventory } from "neverquest/state/inventory";
import { getSellPrice } from "neverquest/utilities/helpers";

export default function SellItems() {
  const setReserve = useReserve();
  const unequipItem = useUnequipItem();
  const [storedInventoryValue, setStoredInventory] = useRecoilState(storedInventory);
  const equippedInventoryValue = useRecoilValue(equippedInventory);

  const entireInventoryEntries = [
    ...Object.entries(equippedInventoryValue),
    ...Object.entries(storedInventoryValue),
  ];

  const sellItem =
    ({ isEquipped, item, key, type }: InventoryContents & { key: string }) =>
    () => {
      if (isEquipped) {
        unequipItem(type);
      } else {
        setStoredInventory((currentInventory) => {
          const newInventoryContents = { ...currentInventory };

          delete newInventoryContents[key];

          return newInventoryContents;
        });
      }

      setReserve({ coinsDifference: getSellPrice(item) });
    };

  return (
    <Stack gap={3}>
      <h6>Sell items</h6>

      {entireInventoryEntries.length === 0 ? (
        <span className="fst-italic">Nothing to sell.</span>
      ) : (
        <Stack gap={3}>
          {entireInventoryEntries.map(([key, { isEquipped, item, type }]) => (
            <Row key={key}>
              <Col xs={7}>
                <Stack direction="horizontal" gap={1}>
                  <InventoryElement item={item} type={type} />

                  {isEquipped && <span className="fst-italic">(Equipped)</span>}
                </Stack>
              </Col>

              <Col>
                <Coins tooltip="Price (coins)" value={getSellPrice(item)} />
              </Col>

              <Col>
                <Button
                  onClick={sellItem({ isEquipped, item, key, type })}
                  variant={UIVariant.Outline}
                >
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
