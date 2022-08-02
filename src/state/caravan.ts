import { nanoid } from "nanoid";
import { atom, atomFamily, DefaultValue, selector, selectorFamily } from "recoil";

import { AffixTag } from "@neverquest/locra/types";
import { level } from "@neverquest/state/encounter";
import { nsfw } from "@neverquest/state/global";
import { InventoryMerchant } from "@neverquest/types";
import { CrewStatus, CrewType } from "@neverquest/types/enums";
import { generateArmor, generateShield, generateWeapon } from "@neverquest/utilities/generators";
import { isItem } from "@neverquest/utilities/type-guards";
import { MERCHANT_OFFERS } from "@neverquest/utilities/constants-caravan";

export interface CrewMap {
  hireStatus: CrewStatus;
  monologueProgress: number;
}

const crewMapping = atomFamily<CrewMap, CrewType>({
  default: {
    hireStatus: CrewStatus.Unavailable,
    monologueProgress: 0,
  },
  key: "crewMapping",
});

export const crewHirable = atom<CrewType[]>({
  key: "crewHirable",
  default: [],
});

export const crew = selectorFamily<CrewMap, CrewType>({
  key: "crew",
  get:
    (type) =>
    ({ get }) =>
      get(crewMapping(type)),
  set:
    (type) =>
    ({ set }, status) => {
      if (status instanceof DefaultValue) {
        return;
      }

      set(crewMapping(type), status);

      if (status.hireStatus === CrewStatus.Hirable) {
        set(crewHirable, (current) => [...current, type]);
      } else {
        set(crewHirable, (current) => current.filter((currentType) => currentType !== type));
      }
    },
});

export const exchangeCoin = atom({
  default: 1,
  key: "exchangeCoin",
});

export const exchangeScrap = atom({
  default: 3,
  key: "exchangeScrap",
});

export const merchantInventory = atom<InventoryMerchant>({
  default: {},
  key: "merchantInventory",
});

// TODO: refactor as useRecoilTransaction(), as soon as it can handle selectors too

export const merchantInventoryGeneration = selector({
  get: () => null,
  key: "merchantInventoryGeneration",
  set: ({ get, set }) => {
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
  },
});
