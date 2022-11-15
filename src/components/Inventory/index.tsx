import { Button, Col, Row, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import Encumbrance from "@neverquest/components/Inventory/Encumbrance";
import InventoryElement from "@neverquest/components/Inventory/InventoryElement";
import useToggleEquipGear from "@neverquest/hooks/actions/useToggleEquipGear";
import { inventory } from "@neverquest/state/inventory";
import { isGear } from "@neverquest/types/type-guards";
import { UIVariant } from "@neverquest/types/ui";

export default function () {
  const inventoryValue = useRecoilValue(inventory);

  const toggleEquipGear = useToggleEquipGear();

  const equippedInventoryIDs = Object.getOwnPropertyNames(inventoryValue).filter(
    (id) => inventoryValue[id].isEquipped
  );
  const storedInventoryValueIDs = Object.getOwnPropertyNames(inventoryValue).filter(
    (id) => !inventoryValue[id].isEquipped
  );

  const handleToggleEquipGear = (id: string) => () => toggleEquipGear(id);

  return (
    <Stack gap={5}>
      <div className="position-sticky">
        <Encumbrance />
      </div>

      <Stack gap={3}>
        <h6>Equipped</h6>

        {equippedInventoryIDs.length === 0 && <span className="fst-italic">Nothing equipped.</span>}

        {equippedInventoryIDs.map((id) => {
          const { key, possession } = inventoryValue[id];

          return (
            <Row key={key}>
              <Col xs={8}>
                <Stack direction="horizontal">
                  <InventoryElement possession={possession} />
                </Stack>
              </Col>

              <Col>
                <Button onClick={handleToggleEquipGear(id)} variant={UIVariant.Outline}>
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
          const { key, possession } = inventoryValue[id];

          return (
            <Row key={key}>
              <Col xs={7}>
                <InventoryElement possession={possession} />
              </Col>

              {isGear(possession) && (
                <Col>
                  <Button onClick={handleToggleEquipGear(id)} variant={UIVariant.Outline}>
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
