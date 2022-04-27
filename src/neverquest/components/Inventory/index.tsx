import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue } from "recoil";

import InventoryElement from "neverquest/components/Inventory/InventoryElement";
import Encumbrance from "neverquest/components/Inventory/Encumbrance";
import { InventoryContents, UIVariant } from "neverquest/env";
import useAcquireItem from "neverquest/hooks/useAcquireItem";
import useEquipItem from "neverquest/hooks/useEquipItem";
import useUnequipItem from "neverquest/hooks/useUnequipItem";
import { equippedInventory, storedInventory } from "neverquest/state/inventory";

export default function Inventory() {
  const [storedInventoryValue, setStoredInventory] = useRecoilState(storedInventory);
  const equippedInventoryValue = useRecoilValue(equippedInventory);

  const acquireItem = useAcquireItem();
  const equipItem = useEquipItem();
  const unequipItem = useUnequipItem();

  const equippedInventoryEntries = Object.entries(equippedInventoryValue);
  const storedInventoryValueEntries = Object.entries(storedInventoryValue);

  const onEquipItem =
    ({ key, item, type }: InventoryContents & { key: string }) =>
    () => {
      equipItem({ item, type });

      setStoredInventory((currentInventory) => {
        const newInventoryContents = { ...currentInventory };

        delete newInventoryContents[key];

        return newInventoryContents;
      });
    };

  const onUnequipItem =
    ({ item, type }: InventoryContents) =>
    () => {
      unequipItem(type);
      acquireItem({ isUnequipping: true, item, type });
    };

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

        {equippedInventoryEntries.map(([key, { item, type }]) => (
          <Row key={key}>
            <Col xs={7}>
              <Stack direction="horizontal">
                <InventoryElement item={item} type={type} />
              </Stack>
            </Col>

            <Col>
              <Button onClick={onUnequipItem({ item, type })} variant={UIVariant.Outline}>
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

        {storedInventoryValueEntries.map(([key, { item, type }]) => {
          // TODO - check if isEquippable
          const isEquippable = true;

          return (
            <Row key={key}>
              <Col xs={7}>
                <InventoryElement item={item} type={type} />
              </Col>

              {isEquippable && (
                <Col>
                  <Button onClick={onEquipItem({ key, item, type })} variant={UIVariant.Outline}>
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
