import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue } from "recoil";

import WeaponInventory from "components/Inventory/WeaponInventory";
import Coins from "components/Loot/Coins";
import { merchantInventory } from "state/caravan";
import { coins } from "state/loot";

export default function BuyItems() {
  const [coinsValue, setCoins] = useRecoilState(coins);
  const merchantInventoryValue = useRecoilValue(merchantInventory);

  // TODO
  const buyItem =
    ({ cost, item }) =>
    () => {
      setCoins((currentCoins) => currentCoins - cost);
      console.log(`Purchased: ${item}`);
    };

  return (
    <div>
      <h6>Buy items</h6>

      <Stack gap={3}>
        {merchantInventoryValue.map(({ cost, item, key, type }) => {
          let Item = null;

          // TODO - all types
          switch (type) {
            case "weapon":
              Item = <WeaponInventory separateName weapon={item} />;
              break;
            default:
              Item = null;
              break;
          }

          return (
            <Stack direction="horizontal" gap={3} key={key}>
              {Item}

              <Coins value={cost} />

              <Button
                disabled={cost > coinsValue}
                onClick={buyItem({ cost, item })}
                variant="outline-dark"
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
