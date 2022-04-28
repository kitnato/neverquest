import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue } from "recoil";

import InventoryElement from "neverquest/components/Inventory/InventoryElement";
import Coins from "neverquest/components/Loot/Coins";
import { InventoryItemStatus, MerchantInventoryContents, UIVariant } from "neverquest/env";
import useAcquireItem from "neverquest/hooks/useAcquireItem";
import useReserve from "neverquest/hooks/useReserve";
import useCheckEncumbrance from "neverquest/hooks/useCheckEncumbrance";
import { merchantInventory } from "neverquest/state/caravan";
import { coins } from "neverquest/state/loot";

export default function BuyItems() {
  const acquireItem = useAcquireItem();
  const checkEncumbrance = useCheckEncumbrance();
  const setReserve = useReserve();
  const coinsValue = useRecoilValue(coins);
  const [merchantInventoryValue, setMerchantInventory] = useRecoilState(merchantInventory);

  const inventoryEntries = Object.entries(merchantInventoryValue);

  const buyItem =
    ({ item, key, type }: MerchantInventoryContents & { key: string }) =>
    () => {
      const itemReceived = acquireItem({ item, type });

      if (itemReceived !== InventoryItemStatus.Rejected) {
        setReserve({ coinsDifference: -item.price });
        setMerchantInventory((currentMerchantInventory) => {
          const newMerchantInventory = { ...currentMerchantInventory };

          delete newMerchantInventory[key];

          return newMerchantInventory;
        });
      }
    };

  return (
    <Stack gap={3}>
      <h6>Buy items</h6>

      <Stack gap={3}>
        {inventoryEntries.length === 0 ? (
          <span className="fst-italic">Nothing available.</span>
        ) : (
          inventoryEntries.map(([key, { item, type }]) => {
            const { price, weight } = item;

            return (
              <Row key={key}>
                <Col xs={7}>
                  <InventoryElement item={item} type={type} />
                </Col>

                <Col>
                  <Coins tooltip="Price (coins)" value={price} />
                </Col>

                <Col>
                  <Button
                    disabled={price > coinsValue || !checkEncumbrance({ weight })}
                    onClick={buyItem({ item, key, type })}
                    variant={UIVariant.Outline}
                  >
                    Buy
                  </Button>
                </Col>
              </Row>
            );
          })
        )}
      </Stack>
    </Stack>
  );
}
