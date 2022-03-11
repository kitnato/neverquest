import { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Caravan from "components/Caravan";
import Loot from "components/Loot";
import Wilderness from "components/Wilderness";
import { merchantInventory } from "state/caravan";
import { isWilderness, level } from "state/global";
import { ITEM_TYPE_WEAPON, WEAPON_TYPE_LIGHT } from "utilities/constants";
import { generateWeapon } from "utilities/helpers";

export default function Encounter() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const levelValue = useRecoilValue(level);
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  useEffect(() => {
    // When encountering the Caravan,
    // generate the merchant's inventory (once per level)
    if (!isWildernessValue) {
      const newInventory = {};

      switch (levelValue) {
        case 1:
          newInventory[uuidv4()] = {
            cost: levelValue * 2,
            item: generateWeapon({
              level: levelValue,
              type: WEAPON_TYPE_LIGHT,
            }),
            type: ITEM_TYPE_WEAPON,
          };
          break;
        case 2: // Armor
        case 3: // Shield
        case 4: // Jewelry
        default:
          break;
      }

      setMerchantInventory((currentMerchantInventory) => ({
        ...currentMerchantInventory,
        ...newInventory,
      }));
    }
  }, [isWildernessValue, levelValue, setMerchantInventory]);

  return (
    <Stack gap={3}>
      {isWildernessValue ? (
        <>
          <Wilderness />

          <Loot />
        </>
      ) : (
        <Caravan />
      )}
    </Stack>
  );
}
