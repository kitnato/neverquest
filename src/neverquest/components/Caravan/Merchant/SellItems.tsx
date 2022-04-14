import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import ArmorInventory from "neverquest/components/Inventory/Armor/ArmorInventory";
import WeaponInventory from "neverquest/components/Inventory/Weapon/WeaponInventory";
import Coins from "neverquest/components/Loot/Coins";
import { Armor, EquipmentType, InventoryContents, UIVariant, Weapon } from "neverquest/env.d";
import { armor, isInventoryFull, inventory, weapon } from "neverquest/state/equipment";
import { coins } from "neverquest/state/loot";
import { getSellPrice } from "neverquest/utilities/helpers";

export default function SellItems() {
  const setCoins = useSetRecoilState(coins);
  const isInventoryFullValue = useRecoilValue(isInventoryFull);
  const setInventory = useSetRecoilState(inventory);
  const resetArmor = useResetRecoilState(armor);
  const resetWeapon = useResetRecoilState(weapon);

  const isInventoryFullEntries = Object.entries(isInventoryFullValue);

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
        setInventory((currentInventory) => {
          const newInventoryContents = { ...currentInventory.contents };

          delete newInventoryContents[key];

          return { ...currentInventory, contents: newInventoryContents };
        });
      }

      setCoins((currentCoins) => currentCoins + getSellPrice(item));
    };

  return (
    <Stack gap={3}>
      <h6>Sell items</h6>

      {isInventoryFullEntries.length === 0 ? (
        <span className="fst-italic">Nothing to sell.</span>
      ) : (
        <Stack gap={3}>
          {isInventoryFullEntries.map(([key, { isEquipped, item, type }]) => {
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
