import { useAtom, useAtomValue } from "jotai";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";

import InventoryElement from "neverquest/components/Inventory/InventoryElement";
import Coins from "neverquest/components/Resource/Coins";
import useAcquireItem from "neverquest/hooks/useAcquireItem";
import useResource from "neverquest/hooks/useResource";
import useCheckEncumbrance from "neverquest/hooks/useCheckEncumbrance";
import { merchantInventory } from "neverquest/state/caravan";
import { coins } from "neverquest/state/resources";
import { InventoryProps } from "neverquest/types/props";
import { UIVariant } from "neverquest/types/ui";

export default function BuyItems() {
  const acquireItem = useAcquireItem();
  const checkEncumbrance = useCheckEncumbrance();
  const setResource = useResource();
  const [merchantInventoryValue, setMerchantInventory] = useAtom(merchantInventory);
  const coinsValue = useAtomValue(coins);

  const inventoryIDs = Object.getOwnPropertySymbols(merchantInventoryValue);

  const buyItem =
    ({ id, item }: InventoryProps) =>
    () => {
      const itemReceived = acquireItem({ item });

      if (itemReceived) {
        setResource({ coinsDifference: -item.price });
        setMerchantInventory((current) => {
          const newMerchantInventory = { ...current };

          delete newMerchantInventory[id];

          return newMerchantInventory;
        });
      }
    };

  return (
    <Stack gap={3}>
      <h6>Buy items</h6>

      <Stack gap={3}>
        {inventoryIDs.length === 0 ? (
          <span className="fst-italic">Nothing available.</span>
        ) : (
          inventoryIDs.map((id) => {
            const { item, key } = merchantInventoryValue[id];
            const { price, weight } = item;
            const isAffordable = price <= coinsValue;
            const isFitting = checkEncumbrance({ weight });
            const isPurchasable = isAffordable && isFitting;

            return (
              <Row key={key}>
                <Col xs={8}>
                  <InventoryElement item={item} />
                </Col>

                <Col>
                  <Coins tooltip="Price (coins)" value={price} />
                </Col>

                <Col>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        {!isAffordable && <div>Not enough coins!</div>}
                        {!isFitting && <div>Over-encumbered!</div>}
                      </Tooltip>
                    }
                    placement="top"
                    trigger={isPurchasable ? [] : ["hover", "focus"]}
                  >
                    <span className="d-inline-block">
                      <Button
                        disabled={!isPurchasable}
                        onClick={buyItem({ id, item })}
                        variant={UIVariant.Outline}
                      >
                        Buy
                      </Button>
                    </span>
                  </OverlayTrigger>
                </Col>
              </Row>
            );
          })
        )}
      </Stack>
    </Stack>
  );
}
