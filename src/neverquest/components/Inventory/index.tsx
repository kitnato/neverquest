import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import ArmorInventory from "neverquest/components/Inventory/Armor/ArmorInventory";
import WeaponInventory from "neverquest/components/Inventory/Weapon/WeaponInventory";
import Encumbrance from "neverquest/components/Inventory/Encumbrance";
import { Armor, EquipmentType, InventoryContents, UIVariant, Weapon } from "neverquest/env.d";
import useAcquireItem from "neverquest/hooks/useAcquireItem";
import useEquipItem from "neverquest/hooks/useEquipItem";
import { armor, equippedInventory, storedInventory, weapon } from "neverquest/state/inventory";

export default function Inventory() {
  const [storedInventoryValue, setStoredInventory] = useRecoilState(storedInventory);
  const acquireItem = useAcquireItem();
  const equipItem = useEquipItem();
  const equippedInventoryValue = useRecoilValue(equippedInventory);
  const resetArmor = useResetRecoilState(armor);
  const resetWeapon = useResetRecoilState(weapon);

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

  const unequipItem =
    ({ item, type }: InventoryContents) =>
    () => {
      // TODO - all types
      switch (type) {
        case EquipmentType.Armor:
          resetArmor();
          break;
        case EquipmentType.Weapon:
          resetWeapon();
          break;
      }

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

        {equippedInventoryEntries.map(([key, { item, type }]) => {
          let Item = null;

          // TODO - all types
          switch (type) {
            case EquipmentType.Armor:
              Item = <ArmorInventory armor={item as Armor} />;
              break;
            case EquipmentType.Weapon:
              Item = <WeaponInventory weapon={item as Weapon} />;
              break;
          }

          return (
            <Row key={key}>
              <Col xs={7}>
                <Stack direction="horizontal">{Item}</Stack>
              </Col>

              <Col>
                <Button onClick={unequipItem({ item, type })} variant={UIVariant.Outline}>
                  Unequip
                </Button>
              </Col>
            </Row>
          );
        })}
      </Stack>

      <Stack gap={3}>
        <h6>Stored</h6>

        {storedInventoryValueEntries.length === 0 && (
          <span className="fst-italic">Nothing stored.</span>
        )}

        {storedInventoryValueEntries.map(([key, { item, type }]) => {
          let Item = null;
          let isEquippable = false;

          // TODO - all types
          switch (type) {
            case EquipmentType.Armor:
              Item = <ArmorInventory armor={item as Armor} />;
              isEquippable = true;
              break;
            case EquipmentType.Weapon:
              Item = <WeaponInventory weapon={item as Weapon} />;
              isEquippable = true;
              break;
          }

          return (
            <Row key={key}>
              <Col xs={7}>
                <Stack direction="horizontal">{Item}</Stack>
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
