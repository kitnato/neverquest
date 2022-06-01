import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { nanoid } from "nanoid";

import { AffixTag, ShieldType, WeaponType } from "locra/types";
import { level, nsfw } from "neverquest/state/global";
import { ArmorClass, CrewType, Inventory, WeaponClass } from "neverquest/types/core";
import { generateArmor, generateShield, generateWeapon } from "neverquest/utilities/generators";
import { ITEM_KNAPSACK } from "neverquest/utilities/constants";

// PRIMITIVES

export const crew = atomWithReset<Record<CrewType, boolean>>({
  [CrewType.Alchemist]: false,
  [CrewType.Blacksmith]: false,
  [CrewType.Cook]: false,
  [CrewType.Medic]: false,
  [CrewType.Mercenary]: false,
  [CrewType.Merchant]: true,
  [CrewType.Tailor]: false,
  [CrewType.Witch]: false,
  [CrewType.Wizard]: false,
});

export const crewMonologues = atomWithReset<Record<CrewType, string>>({
  // TODO - improve and diversify.
  [CrewType.Alchemist]: "",
  [CrewType.Blacksmith]: "Care for some new shiny gear?",
  [CrewType.Cook]: "",
  [CrewType.Medic]: "",
  [CrewType.Mercenary]: "Perhaps I can teach you something.",
  [CrewType.Merchant]: "Greetings, stranger. I have what you're looking for.",
  [CrewType.Tailor]: "",
  [CrewType.Witch]: "",
  [CrewType.Wizard]: "",
});

export const exchangeCoin = atomWithReset(1);

export const exchangeScrap = atomWithReset(3);

export const merchantInventory = atomWithReset<Inventory>({});

export const merchantInventoryGenerated = atomWithReset(0);

// WRITERS

export const merchantInventoryGeneration = atom(null, (get, set) => {
  const newInventory: Inventory = {};

  const levelValue = get(level);
  const nsfwValue = get(nsfw);

  if (get(merchantInventoryGenerated) >= levelValue) {
    return;
  }

  switch (levelValue) {
    case 1:
      newInventory[Symbol()] = {
        item: generateWeapon({
          hasPrefix: true,
          isNSFW: nsfwValue,
          level: levelValue,
          tags: [AffixTag.LowQuality],
          type: WeaponType.Melee,
          weaponClass: WeaponClass.Light,
        }),
        key: nanoid(),
      };
      break;
    case 2:
      newInventory[Symbol()] = {
        item: generateArmor({
          armorClass: ArmorClass.Hide,
          hasPrefix: true,
          isNSFW: nsfwValue,
          level: levelValue,
          tags: [AffixTag.LowQuality],
        }),
        key: nanoid(),
      };
      break;
    case 3:
      newInventory[Symbol()] = {
        item: generateShield({
          hasPrefix: true,
          isNSFW: nsfwValue,
          level: levelValue,
          tags: [AffixTag.LowQuality],
          type: ShieldType.Small,
        }),
        key: nanoid(),
      };
      break;
    case 4:
      newInventory[Symbol()] = {
        item: ITEM_KNAPSACK,
        key: nanoid(),
      };
      break;
  }

  set(merchantInventory, (current) => ({
    ...current,
    ...newInventory,
  }));
  set(merchantInventoryGenerated, levelValue);
});
