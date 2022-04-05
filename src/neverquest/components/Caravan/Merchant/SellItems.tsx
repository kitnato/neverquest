import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import WeaponInventory from "neverquest/components/Inventory/WeaponInventory";
import Coins from "neverquest/components/Loot/Coins";
import { EquipmentType, InventoryContents, UIVariant, Weapon } from "neverquest/env.d";
import { fullInventory, inventory, weapon } from "neverquest/state/equipment";
import { coins } from "neverquest/state/loot";
import { getSellPrice } from "neverquest/utilities/helpers";

export default function SellItems() {
  const setCoins = useSetRecoilState(coins);
  const fullInventoryValue = useRecoilValue(fullInventory);
  const setInventory = useSetRecoilState(inventory);
  const resetWeapon = useResetRecoilState(weapon);

  const fullInventoryEntries = Object.entries(fullInventoryValue);

  const sellItem =
    ({ isEquipped, item, key, type }: InventoryContents & { key: string }) =>
    () => {
      if (isEquipped) {
        // TODO - other types
        switch (type) {
          case EquipmentType.Weapon:
            resetWeapon();
            break;
          default:
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
    <div>
      <h6>Sell items</h6>

      {fullInventoryEntries.length === 0 ? (
        <span style={{ fontStyle: "italic" }}>Nothing to sell.</span>
      ) : (
        fullInventoryEntries.map(([key, { isEquipped, item, type }]) => {
          let Item = null;

          // TODO - all types
          switch (type) {
            case EquipmentType.Weapon:
              Item = <WeaponInventory showName weapon={item as Weapon} />;
              break;
            default:
              break;
          }

          return (
            <Stack direction="horizontal" gap={3} key={key}>
              {Item}

              {isEquipped && <span style={{ fontStyle: "italic" }}>(Equipped)</span>}

              <Coins tooltip="Price (coins)" value={getSellPrice(item)} />

              <Button
                onClick={sellItem({ isEquipped, item, key, type })}
                variant={UIVariant.Outline}
              >
                Sell
              </Button>
            </Stack>
          );
        })
      )}
    </div>
  );
}
