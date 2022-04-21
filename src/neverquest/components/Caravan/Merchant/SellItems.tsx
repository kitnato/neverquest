import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import ArmorInventory from "neverquest/components/Inventory/Armor/ArmorInventory";
import WeaponInventory from "neverquest/components/Inventory/Weapon/WeaponInventory";
import Coins from "neverquest/components/Loot/Coins";
import { Armor, EquipmentType, InventoryContents, UIVariant, Weapon } from "neverquest/env";
import useReserve from "neverquest/hooks/useReserve";
import { armor, equippedInventory, storedInventory, weapon } from "neverquest/state/inventory";
import { getSellPrice } from "neverquest/utilities/helpers";

export default function SellItems() {
  const setReserve = useReserve();
  const [storedInventoryValue, setStoredInventory] = useRecoilState(storedInventory);
  const resetArmor = useResetRecoilState(armor);
  const resetWeapon = useResetRecoilState(weapon);
  const equippedInventoryValue = useRecoilValue(equippedInventory);

  const entireInventoryEntries = [
    ...Object.entries(equippedInventoryValue),
    ...Object.entries(storedInventoryValue),
  ];

  const sellItem =
    ({ isEquipped, item, key, type }: InventoryContents & { key: string }) =>
    () => {
      if (isEquipped) {
        // TODO - other types
        switch (type) {
          case EquipmentType.Armor:
            resetArmor();
            break;
          case EquipmentType.Weapon:
            resetWeapon();
            break;
        }
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
          {entireInventoryEntries.map(([key, { isEquipped, item, type }]) => {
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
                  <Stack direction="horizontal">
                    {Item}

                    {isEquipped && <span className="fst-italic">&nbsp;(Equipped)</span>}
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
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
