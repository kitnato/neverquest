import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useRecoilState } from "recoil";

import WeaponInventory from "components/Inventory/WeaponInventory";
import Coins from "components/Loot/Coins";
import useReceiveItem from "hooks/useReceiveItem";
import { merchantInventory } from "state/caravan";
import { coins } from "state/loot";
import { INVENTORY_REJECTED, ITEM_TYPE_WEAPON } from "utilities/constants";

export default function BuyItems() {
  const [coinsValue, setCoins] = useRecoilState(coins);
  const [merchantInventoryValue, setMerchantInventory] =
    useRecoilState(merchantInventory);
  const receiveItem = useReceiveItem();

  const buyItem =
    ({ cost, item, key, type }) =>
    () => {
      const itemReceived = receiveItem({ item, type });

      if (itemReceived !== INVENTORY_REJECTED) {
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
        {Object.entries(merchantInventoryValue).map(
          ([key, { cost, item, type }]) => {
            let Item = null;

            // TODO - all types
            switch (type) {
              case ITEM_TYPE_WEAPON:
                Item = <WeaponInventory separateName weapon={item} />;
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
                  variant="outline-dark"
                >
                  Buy
                </Button>
              </Stack>
            );
          }
        )}
      </Stack>
    </div>
  );
}
