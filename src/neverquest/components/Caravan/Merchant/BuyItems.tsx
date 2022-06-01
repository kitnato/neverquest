import { MouseEvent } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";

import InventoryElement from "neverquest/components/Inventory/InventoryElement";
import Coins from "neverquest/components/Resource/Coins";
import useAcquireItem from "neverquest/hooks/useAcquireItem";
import useCheckEncumbrance from "neverquest/hooks/useCheckEncumbrance";
import { merchantInventory } from "neverquest/state/caravan";
import { resourcesBalance, coins } from "neverquest/state/resources";
import { UIVariant } from "neverquest/types/ui";

export default function BuyItems() {
  const acquireItem = useAcquireItem();
  const checkEncumbrance = useCheckEncumbrance();
  const balanceResources = useSetAtom(resourcesBalance);
  const [merchantInventoryValue, setMerchantInventory] = useAtom(merchantInventory);
  const coinsValue = useAtomValue(coins);

  const inventoryIDs = Object.getOwnPropertySymbols(merchantInventoryValue);

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
                        onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
                          currentTarget.blur();

                          const itemReceived = acquireItem({ item });

                          if (itemReceived) {
                            balanceResources({ coinsDifference: -item.price });
                            setMerchantInventory((current) => {
                              const newMerchantInventory = { ...current };

                              delete newMerchantInventory[id];

                              return newMerchantInventory;
                            });
                          }
                        }}
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
