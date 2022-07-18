import { useAtomValue } from "jotai";
import { Col, Row, Stack } from "react-bootstrap";

import BuyItemButton from "@neverquest/components/Caravan/Merchant/BuyItemButton";
import InventoryElement from "@neverquest/components/Inventory/InventoryElement";
import Coins from "@neverquest/components/Resource/Coins";
import { merchantInventory } from "@neverquest/state/caravan";

export default function BuyItems() {
  const merchantInventoryValue = useAtomValue(merchantInventory);

  const newItemIDs = Object.getOwnPropertySymbols(merchantInventoryValue).filter(
    (id) => !merchantInventoryValue[id].isReturned
  );
  const returnedItemIDs = Object.getOwnPropertySymbols(merchantInventoryValue).filter(
    (id) => merchantInventoryValue[id].isReturned
  );

  const PurchasableItems = ({ inventoryIDs }: { inventoryIDs: symbol[] }) => (
    <>
      {inventoryIDs.map((id) => {
        const { item, key } = merchantInventoryValue[id];

        return (
          <Row key={key}>
            <Col>
              <InventoryElement item={item} />
            </Col>

            <Col>
              <Coins tooltip="Price (coins)" value={item.price} />
            </Col>

            <Col>
              <BuyItemButton id={id} />
            </Col>
          </Row>
        );
      })}
    </>
  );

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Buy items</h6>

        {newItemIDs.length === 0 ? (
          <span className="fst-italic">Nothing available.</span>
        ) : (
          <PurchasableItems inventoryIDs={newItemIDs} />
        )}
      </Stack>

      {returnedItemIDs.length > 0 && (
        <Stack gap={3}>
          <h6>Buy back items</h6>

          <PurchasableItems inventoryIDs={returnedItemIDs} />
        </Stack>
      )}
    </Stack>
  );
}
