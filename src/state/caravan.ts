import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { nanoid } from "nanoid";

import { AffixTag } from "@neverquest/locra/types";
import { level } from "@neverquest/state/encounter";
import { nsfw } from "@neverquest/state/global";
import { InventoryMerchant } from "@neverquest/types";
import { CrewHireStatus, CrewType } from "@neverquest/types/enums";
import { generateArmor, generateShield, generateWeapon } from "@neverquest/utilities/generators";
import { isItem } from "@neverquest/utilities/type-guards";
import { MERCHANT_OFFERS } from "@neverquest/utilities/constants-caravan";

// PRIMITIVES

export const crew = atomWithReset<
  Record<CrewType, { hireStatus: CrewHireStatus; monologueProgress: number }>
>({
  [CrewType.Blacksmith]: {
    hireStatus: CrewHireStatus.Unavailable,
    monologueProgress: 0,
  },
  [CrewType.Cook]: {
    hireStatus: CrewHireStatus.Unavailable,
    monologueProgress: 0,
  },
  [CrewType.Medic]: {
    hireStatus: CrewHireStatus.Unavailable,
    monologueProgress: 0,
  },
  [CrewType.Mercenary]: {
    hireStatus: CrewHireStatus.Unavailable,
    monologueProgress: 0,
  },
  [CrewType.Merchant]: {
    hireStatus: CrewHireStatus.Hired,
    monologueProgress: 0,
  },
  [CrewType.Tailor]: {
    hireStatus: CrewHireStatus.Unavailable,
    monologueProgress: 0,
  },
});

export const exchangeCoin = atomWithReset(1);

export const exchangeScrap = atomWithReset(3);

export const merchantInventory = atomWithReset<InventoryMerchant>({});

// WRITERS

export const merchantInventoryGeneration = atom(null, (get, set) => {
  const levelValue = get(level);
  const inventory = { ...get(merchantInventory) };
  const nsfwValue = get(nsfw);

  // Remove all previously returned items, so they no longer appear under buy back.
  Object.getOwnPropertySymbols(inventory)
    .filter((id) => inventory[id].isReturned)
    .forEach((id) => delete inventory[id]);

  // Merchant always offers one of each (low quality) gear at the current level, even if previously sold.
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

  set(merchantInventory, inventory);
});
