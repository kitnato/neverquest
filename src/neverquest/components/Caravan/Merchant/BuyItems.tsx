import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue } from "recoil";

import ArmorInventory from "neverquest/components/Inventory/Armor/ArmorInventory";
import WeaponInventory from "neverquest/components/Inventory/Weapon/WeaponInventory";
import Coins from "neverquest/components/Loot/Coins";
import {
  Armor,
  InventoryItemStatus,
  EquipmentType,
  MerchantInventoryContents,
  UIVariant,
  Weapon,
} from "neverquest/env.d";
import useAcquireItem from "neverquest/hooks/useAcquireItem";
import { merchantInventory } from "neverquest/state/caravan";
import { isInventoryFull } from "neverquest/state/inventory";
import { coins } from "neverquest/state/loot";

export default function BuyItems() {
  const acquireItem = useAcquireItem();
  const [coinsValue, setCoins] = useRecoilState(coins);
  const [merchantInventoryValue, setMerchantInventory] = useRecoilState(merchantInventory);
  const isInventoryFullValue = useRecoilValue(isInventoryFull);

  const inventoryEntries = Object.entries(merchantInventoryValue);

  const buyItem =
    ({ item, key, type }: MerchantInventoryContents & { key: string }) =>
    () => {
      const itemReceived = acquireItem({ item, type });

      if (itemReceived !== InventoryItemStatus.Rejected) {
        setCoins((currentCoins) => currentCoins - item.price);
        setMerchantInventory((currentMerchantInventory) => {
          const newMerchantInventory = { ...currentMerchantInventory };

          delete newMerchantInventory[key];

          return newMerchantInventory;
        });
      }
    };

  return (
    <Stack gap={3}>
      <h6>Buy items</h6>

      <Stack gap={3}>
        {inventoryEntries.length === 0 ? (
          <span className="fst-italic">Nothing available.</span>
        ) : (
          inventoryEntries.map(([key, { item, type }]) => {
            const { price } = item;
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
                <Col xs={7}>{Item}</Col>

                <Col>
                  <Coins tooltip="Price (coins)" value={price} />
                </Col>

                <Col>
                  <Button
                    disabled={price > coinsValue || isInventoryFullValue}
                    onClick={buyItem({ item, key, type })}
                    variant={UIVariant.Outline}
                  >
                    Buy
                  </Button>
                </Col>
              </Row>
            );
          })
        )}
      </Stack>
    </Stack>
  );
}
