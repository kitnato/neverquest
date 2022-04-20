import { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Caravan from "neverquest/components/Caravan";
import Loot from "neverquest/components/Loot";
import Wilderness from "neverquest/components/Wilderness";
import { ArmorWeight, EquipmentType, MerchantInventory, WeaponWeight } from "neverquest/env.d";
import { merchantInventory } from "neverquest/state/caravan";
import { isWilderness, level, nsfw } from "neverquest/state/global";
import { generateArmor, generateWeapon } from "neverquest/utilities/generators";
import { AffixTag, WeaponType } from "locra/env.d";

export default function Encounter() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const levelValue = useRecoilValue(level);
  const nsfwValue = useRecoilValue(nsfw);
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  useEffect(() => {
    // When encountering the Caravan,
    // generate the merchant's inventory (once per level)
    if (!isWildernessValue) {
      const newInventory: MerchantInventory = {};

      switch (levelValue) {
        case 1:
          newInventory[uuidv4()] = {
            item: generateWeapon({
              hasPrefix: true,
              isNSFW: nsfwValue,
              level: levelValue,
              tags: [AffixTag.LowQuality],
              type: WeaponType.Melee,
              weight: WeaponWeight.Light,
            }),
            type: EquipmentType.Weapon,
          };
          break;
        case 2:
          newInventory[uuidv4()] = {
            item: generateArmor({
              hasPrefix: true,
              isNSFW: nsfwValue,
              level: levelValue,
              tags: [AffixTag.LowQuality],
              weight: ArmorWeight.Light,
            }),
            type: EquipmentType.Armor,
          };
          break;
        case 3: // Shield
        case 4: // Accessory
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
