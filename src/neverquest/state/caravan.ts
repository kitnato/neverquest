import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { nanoid } from "nanoid";

import { AffixTag } from "locra/types";
import { level } from "neverquest/state/encounter";
import { nsfw } from "neverquest/state/global";
import { CrewType, InventoryMerchant } from "neverquest/types/core";
import { generateArmor, generateShield, generateWeapon } from "neverquest/utilities/generators";
import { isItem } from "neverquest/utilities/type-guards";
import { MERCHANT_OFFERS } from "neverquest/utilities/constants";

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

export const crewMonologues = atomWithReset<Record<CrewType, string[]>>({
  // TODO - improve and diversify.
  [CrewType.Alchemist]: [""],
  [CrewType.Blacksmith]: ["Care for some new gear?"],
  [CrewType.Cook]: [""],
  [CrewType.Medic]: [""],
  [CrewType.Mercenary]: ["Perhaps I can teach you something."],
  [CrewType.Merchant]: [
    "Greetings. I have what you're looking for.",
    "Hello again. Some threads, perhaps?",
    "Ah, you're back. Care for more protection?",
    "You must be over-burdened. I have just the thing.",
    "My acquisitions carry great risk. Could you help?",
    "Welcome back. Always a sight for sore eyes.",
  ],
  [CrewType.Tailor]: [""],
  [CrewType.Witch]: [""],
  [CrewType.Wizard]: [""],
});

export const exchangeCoin = atomWithReset(1);

export const exchangeScrap = atomWithReset(3);

export const merchantInventory = atomWithReset<InventoryMerchant>({});

export const merchantInventoryGenerated = atomWithReset(0);

// WRITERS

export const merchantInventoryGeneration = atom(null, (get, set) => {
  const levelValue = get(level);

  if (get(merchantInventoryGenerated) >= levelValue) {
    return;
  }

  const inventory = get(merchantInventory);
  const nsfwValue = get(nsfw);

  // Remove all previously returned items, so they no longer appear under buy back.
  Object.getOwnPropertySymbols(inventory)
    .filter((id) => inventory[id].isReturned)
    .forEach((id) => delete inventory[id]);

  // Merchant always offers one of each (low quality) gear at the current level, even if previously sold.
  // Level 5 and beyond only apply if the knapsack was bought (unique purchase).
  const gearSettings = {
    hasPrefix: true,
    isNSFW: nsfwValue,
    level: levelValue,
    tags: [AffixTag.LowQuality],
  };

  MERCHANT_OFFERS[levelValue].forEach((item) => {
    const symbol = Symbol();
    const inventoryContentsBase = {
      isReturned: false,
      key: nanoid(),
    };

    if (isItem(item)) {
      inventory[symbol] = {
        ...inventoryContentsBase,
        item,
      };
    } else {
      const gear = (() => {
        if ("armorClass" in item) {
          return generateArmor({
            ...gearSettings,
            ...item,
          });
        }

        if ("weaponClass" in item) {
          return generateWeapon({
            ...gearSettings,
            ...item,
          });
        }

        return generateShield({
          ...gearSettings,
          ...item,
        });
      })();

      inventory[symbol] = {
        ...inventoryContentsBase,
        item: gear,
      };
    }
  });

  set(merchantInventory, { ...inventory });
  set(merchantInventoryGenerated, levelValue);
});
