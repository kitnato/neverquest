import { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Caravan from "neverquest/components/Caravan";
import Loot from "neverquest/components/Loot";
import Wilderness from "neverquest/components/Wilderness";
import { ArmorClass, EquipmentType, MerchantInventory, WeaponClass } from "neverquest/env";
import { merchantInventory } from "neverquest/state/caravan";
import { isWilderness, level, nsfw } from "neverquest/state/global";
import { generateArmor, generateShield, generateWeapon } from "neverquest/utilities/generators";
import { AffixTag, ShieldType, WeaponType } from "locra/env";

export default function Encounter() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const levelValue = useRecoilValue(level);
  const nsfwValue = useRecoilValue(nsfw);
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  // TODO - move into hook or selector?
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
              weaponClass: WeaponClass.Light,
            }),
            type: EquipmentType.Weapon,
          };
          break;
        case 2:
          newInventory[uuidv4()] = {
            item: generateArmor({
              armorClass: ArmorClass.Light,
              hasPrefix: true,
              isNSFW: nsfwValue,
              level: levelValue,
              tags: [AffixTag.LowQuality],
            }),
            type: EquipmentType.Armor,
          };
          break;
        case 3:
          newInventory[uuidv4()] = {
            item: generateShield({
              hasPrefix: true,
              isNSFW: nsfwValue,
              level: levelValue,
              tags: [AffixTag.LowQuality],
              type: ShieldType.Small,
            }),
            type: EquipmentType.Shield,
          };
          break;
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
