import { Button, Col, Row, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Encumbrance from "@neverquest/components/Inventory/Encumbrance";
import InventoryElement from "@neverquest/components/Inventory/InventoryElement";
import { inventory } from "@neverquest/state/inventory";
import { itemEquip, itemUnequip } from "@neverquest/state/transactions";
import { isGear } from "@neverquest/types/type-guards";
import { UIVariant } from "@neverquest/types/ui";

export default function () {
  const inventoryValue = useRecoilValue(inventory);
  const equipItem = useSetRecoilState(itemEquip);
  const unequipItem = useSetRecoilState(itemUnequip);

  const equippedInventoryIDs = Object.getOwnPropertyNames(inventoryValue).filter(
    (id) => inventoryValue[id].isEquipped
  );
  const storedInventoryValueIDs = Object.getOwnPropertyNames(inventoryValue).filter(
    (id) => !inventoryValue[id].isEquipped
  );

  const onEquipItem = (id: string) => () => equipItem(id);
  const onUnequipItem = (id: string) => () => unequipItem(id);

  return (
    <Stack gap={5}>
      <div className="position-sticky">
        <Encumbrance />
      </div>

      <Stack gap={3}>
        <h6>Equipped</h6>

        {equippedInventoryIDs.length === 0 && <span className="fst-italic">Nothing equipped.</span>}

        {equippedInventoryIDs.map((id) => {
          const { item, key } = inventoryValue[id];

          return (
            <Row key={key}>
              <Col xs={8}>
                <Stack direction="horizontal">
                  <InventoryElement item={item} />
                </Stack>
              </Col>

              <Col>
                <Button onClick={onUnequipItem(id)} variant={UIVariant.Outline}>
                  Unequip
                </Button>
              </Col>
            </Row>
          );
        })}
      </Stack>

      <Stack gap={3}>
        <h6>Stored</h6>

        {storedInventoryValueIDs.length === 0 && (
          <span className="fst-italic">Nothing stored.</span>
        )}

        {storedInventoryValueIDs.map((id) => {
          const { item, key } = inventoryValue[id];

          return (
            <Row key={key}>
              <Col xs={7}>
                <InventoryElement item={item} />
              </Col>

              {isGear(item) && (
                <Col>
                  <Button onClick={onEquipItem(id)} variant={UIVariant.Outline}>
                    Equip
                  </Button>
                </Col>
              )}
            </Row>
          );
        })}
      </Stack>
    </Stack>
  );
}
