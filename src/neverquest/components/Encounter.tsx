import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import { nanoid } from "nanoid";

import Caravan from "neverquest/components/Caravan";
import Loot from "neverquest/components/Resource/Loot";
import Wilderness from "neverquest/components/Wilderness";
import { ArmorClass, Inventory, WeaponClass } from "neverquest/types/core";
import { merchantInventory } from "neverquest/state/caravan";
import { isWilderness, level, nsfw } from "neverquest/state/global";
import { generateArmor, generateShield, generateWeapon } from "neverquest/utilities/generators";
import { AffixTag, ShieldType, WeaponType } from "locra/types";

export default function Encounter() {
  const isWildernessValue = useAtomValue(isWilderness);
  const levelValue = useAtomValue(level);
  const nsfwValue = useAtomValue(nsfw);
  const setMerchantInventory = useSetAtom(merchantInventory);

  // TODO - move into hook or selector?
  useEffect(() => {
    // When encountering the Caravan,
    // generate the merchant's inventory (once per level)
    if (!isWildernessValue) {
      const newInventory: Inventory = {};
      const id = Symbol();
      const key = nanoid();

      switch (levelValue) {
        case 1:
          newInventory[id] = {
            item: generateWeapon({
              hasPrefix: true,
              isNSFW: nsfwValue,
              level: levelValue,
              tags: [AffixTag.LowQuality],
              type: WeaponType.Melee,
              weaponClass: WeaponClass.Light,
            }),
            key,
          };
          break;
        case 2:
          newInventory[id] = {
            item: generateArmor({
              armorClass: ArmorClass.Light,
              hasPrefix: true,
              isNSFW: nsfwValue,
              level: levelValue,
              tags: [AffixTag.LowQuality],
            }),
            key,
          };
          break;
        case 3:
          newInventory[id] = {
            item: generateShield({
              hasPrefix: true,
              isNSFW: nsfwValue,
              level: levelValue,
              tags: [AffixTag.LowQuality],
              type: ShieldType.Small,
            }),
            key,
          };
          break;
        case 4: // Trinket & Knapsack
      }

      setMerchantInventory((current) => ({
        ...current,
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
