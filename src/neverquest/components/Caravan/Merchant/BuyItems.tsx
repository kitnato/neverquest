import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useRecoilState } from "recoil";

import WeaponInventory from "neverquest/components/Inventory/WeaponInventory";
import Coins from "neverquest/components/Loot/Coins";
import {
  InventoryItemStatus,
  EquipmentType,
  MerchantInventoryContents,
  UIVariant,
  Weapon,
} from "neverquest/env.d";
import useReceiveItem from "neverquest/hooks/useReceiveItem";
import { merchantInventory } from "neverquest/state/caravan";
import { coins } from "neverquest/state/loot";

export default function BuyItems() {
  const [coinsValue, setCoins] = useRecoilState(coins);
  const [merchantInventoryValue, setMerchantInventory] = useRecoilState(merchantInventory);
  const receiveItem = useReceiveItem();

  const buyItem =
    ({ cost, item, key, type }: MerchantInventoryContents & { key: string }) =>
    () => {
      const itemReceived = receiveItem({ item, type });

      if (itemReceived !== InventoryItemStatus.Rejected) {
        setCoins((currentCoins) => currentCoins - cost);
        setMerchantInventory((currentMerchantInventory) => {
          const newMerchantInventory = { ...currentMerchantInventory };

          delete newMerchantInventory[key];

          return newMerchantInventory;
        });
      }
    };

  return (
    <div>
      <h6>Buy items</h6>

      <Stack gap={3}>
        {Object.entries(merchantInventoryValue).map(([key, { cost, item, type }]) => {
          let Item = null;

          // TODO - all types
          switch (type) {
            case EquipmentType.Weapon:
              Item = <WeaponInventory separateName weapon={item as Weapon} />;
              break;
            default:
              break;
          }

          return (
            <Stack direction="horizontal" gap={3} key={key}>
              {Item}

              <Coins tooltip="Cost (coins)" value={cost} />

              <Button
                disabled={cost > coinsValue}
                onClick={buyItem({ cost, item, key, type })}
                variant={UIVariant.Outline}
              >
                Buy
              </Button>
            </Stack>
          );
        })}
      </Stack>
    </div>
  );
}
