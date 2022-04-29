import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import InventoryElement from "neverquest/components/Inventory/InventoryElement";
import Encumbrance from "neverquest/components/Inventory/Encumbrance";
import useEquipItem from "neverquest/hooks/useEquipItem";
import useUnequipItem from "neverquest/hooks/useUnequipItem";
import { inventory } from "neverquest/state/inventory";
import { InventoryContentProps } from "neverquest/types/props";
import { UIVariant } from "neverquest/types/ui";

export default function Inventory() {
  const inventoryValue = useRecoilValue(inventory);

  const equipItem = useEquipItem();
  const unequipItem = useUnequipItem();

  const equippedInventoryEntries = Object.entries(inventoryValue).filter(
    ([, { isEquipped }]) => isEquipped
  );
  const storedInventoryValueEntries = Object.entries(inventoryValue).filter(
    ([, { isEquipped }]) => !isEquipped
  );

  const onEquipItem =
    ({ item, key }: InventoryContentProps) =>
    () =>
      equipItem({ item, key });

  const onUnequipItem =
    ({ item, key }: InventoryContentProps) =>
    () =>
      unequipItem({ item, key });

  return (
    <Stack gap={5}>
      <Stack className="position-sticky">
        <Encumbrance />
      </Stack>

      <Stack gap={3}>
        <h6>Equipped</h6>

        {equippedInventoryEntries.length === 0 && (
          <span className="fst-italic">Nothing equipped.</span>
        )}

        {equippedInventoryEntries.map(([key, { item }]) => (
          <Row key={key}>
            <Col xs={8}>
              <Stack direction="horizontal">
                <InventoryElement item={item} />
              </Stack>
            </Col>

            <Col>
              <Button onClick={onUnequipItem({ item, key })} variant={UIVariant.Outline}>
                Unequip
              </Button>
            </Col>
          </Row>
        ))}
      </Stack>

      <Stack gap={3}>
        <h6>Stored</h6>

        {storedInventoryValueEntries.length === 0 && (
          <span className="fst-italic">Nothing stored.</span>
        )}

        {storedInventoryValueEntries.map(([key, { item }]) => {
          // TODO - check if isEquippable
          const isEquippable = true;

          return (
            <Row key={key}>
              <Col xs={7}>
                <InventoryElement item={item} />
              </Col>

              {isEquippable && (
                <Col>
                  <Button onClick={onEquipItem({ item, key })} variant={UIVariant.Outline}>
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
