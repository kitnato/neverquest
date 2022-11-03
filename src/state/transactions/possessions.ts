import { nanoid } from "nanoid";
import { DefaultValue, selector } from "recoil";

import { MERCHANT_OFFERS } from "@neverquest/constants/caravan";
import { AffixTag } from "@neverquest/locra/types";
import { attributes } from "@neverquest/state/attributes";
import { merchantInventory } from "@neverquest/state/caravan";
import { level } from "@neverquest/state/encounter";
import { inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import {
  coins,
  coinsLoot,
  essence,
  essenceLoot,
  scrap,
  scrapLoot,
} from "@neverquest/state/resources";
import { isNSFW } from "@neverquest/state/settings";
import { AttributeType, ShowingType } from "@neverquest/types/enums";
import { isArmor, isItem, isShield, isWeapon } from "@neverquest/types/type-guards";
import { generateArmor, generateShield, generateWeapon } from "@neverquest/utilities/generators";

export const itemEquip = selector({
  get: () => nanoid(),
  key: "itemEquip",
  set: ({ get, set }, id) => {
    if (id instanceof DefaultValue) {
      return;
    }

    const { item } = get(inventory)[id];

    if (!item) {
      return;
    }

    set(inventory, (current) => ({
      ...current,
      [id]: { ...current[id], isEquipped: true },
    }));

    if (isArmor(item)) {
      if (!get(isShowing(ShowingType.Armor))) {
        set(isShowing(ShowingType.Armor), true);
      }

      if (!get(isShowing(ShowingType.TotalProtection))) {
        set(isShowing(ShowingType.TotalProtection), true);
      }
    }

    if (isShield(item)) {
      if (!get(isShowing(ShowingType.Shield))) {
        set(isShowing(ShowingType.Shield), true);
      }

      if (!get(isShowing(ShowingType.BlockChance))) {
        set(isShowing(ShowingType.BlockChance), true);
      }
    }

    if (isWeapon(item)) {
      if (!get(isShowing(ShowingType.Stamina)) && item.staminaCost > 0) {
        set(isShowing(ShowingType.Stamina), true);

        if (!get(attributes(AttributeType.Stamina)).isUnlocked) {
          set(attributes(AttributeType.Stamina), (current) => ({
            ...current,
            isUnlocked: true,
          }));
        }
      }

      if (!get(isShowing(ShowingType.TotalAttackRateSummary))) {
        set(isShowing(ShowingType.TotalAttackRateSummary), true);
      }

      if (!get(isShowing(ShowingType.TotalDamageSummary))) {
        set(isShowing(ShowingType.TotalDamageSummary), true);
      }

      if (!get(isShowing(ShowingType.Weapon))) {
        set(isShowing(ShowingType.Weapon), true);
      }
    }
  },
});

export const itemUnequip = selector({
  get: () => nanoid(),
  key: "itemUnequip",
  set: ({ set }, id) => {
    if (id instanceof DefaultValue) {
      return;
    }

    set(inventory, (current) => ({
      ...current,
      [id]: { ...current[id], isEquipped: false },
    }));
  },
});

export const merchantInventoryGeneration = selector({
  get: () => null,
  key: "merchantInventoryGeneration",
  set: ({ get, set }) => {
    const inventory = { ...get(merchantInventory) };
    const levelValue = get(level);
    const nsfwValue = get(isNSFW);

    // Remove all previously returned items, so they no longer appear under buy back.
    Object.getOwnPropertyNames(inventory)
      .filter((id) => inventory[id].isReturned)
      .forEach((id) => delete inventory[id]);

    const merchantOffersIndex = levelValue - 1;

    if (MERCHANT_OFFERS[merchantOffersIndex]) {
      // Merchant always offers one of each (low quality) gear at the current level, even if previously sold.
      const gearSettings = {
        hasPrefix: true,
        isNSFW: nsfwValue,
        level: levelValue,
        tags: [AffixTag.LowQuality],
      };

      MERCHANT_OFFERS[merchantOffersIndex].forEach((item) => {
        const id = nanoid();
        const inventoryContentsBase = {
          isReturned: false,
          key: nanoid(),
        };

        if (isItem(item)) {
          inventory[id] = {
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

          inventory[id] = {
            ...inventoryContentsBase,
            item: gear,
          };
        }
      });

      set(merchantInventory, inventory);
    }
  },
});

export const resourcesBalance = selector({
  get: () => ({}),
  key: "resourcesBalance",
  set: (
    { get, set },
    difference:
      | Partial<{
          coinsDifference: number;
          essenceDifference: number;
          scrapDifference: number;
        }>
      | DefaultValue
  ) => {
    if (difference instanceof DefaultValue) {
      return;
    }

    const { coinsDifference, essenceDifference, scrapDifference } = difference;
    const isLooting =
      coinsDifference === undefined &&
      essenceDifference === undefined &&
      scrapDifference === undefined;
    const coinsValue = isLooting ? get(coinsLoot) : coinsDifference || 0;
    const essenceValue = isLooting ? get(essenceLoot) : essenceDifference || 0;
    const scrapValue = isLooting ? get(scrapLoot) : scrapDifference || 0;

    if (coinsValue !== 0) {
      set(coins, (current) => current + coinsValue);

      if (!get(isShowing(ShowingType.Coins))) {
        set(isShowing(ShowingType.Coins), true);
      }

      if (isLooting) {
        set(coinsLoot, 0);
      }
    }

    if (essenceValue !== 0) {
      set(essence, (current) => current + essenceValue);

      if (!get(isShowing(ShowingType.Essence))) {
        set(isShowing(ShowingType.Essence), true);
      }

      if (!get(isShowing(ShowingType.AttributesButton))) {
        set(isShowing(ShowingType.AttributesButton), true);
      }

      if (isLooting) {
        set(essenceLoot, 0);
      }
    }

    if (scrapValue !== 0) {
      set(scrap, (current) => current + scrapValue);

      if (!get(isShowing(ShowingType.Scrap))) {
        set(isShowing(ShowingType.Scrap), true);
      }

      if (isLooting) {
        set(scrapLoot, 0);
      }
    }
  },
});
