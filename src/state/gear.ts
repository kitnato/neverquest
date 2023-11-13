import { selector, selectorFamily } from "recoil";

import {
  ARMOR_NONE,
  GEMS_MAXIMUM,
  GEM_DAMAGE,
  GEM_DURATION,
  GEM_ELEMENTALS,
  GEM_ENHANCEMENT,
  GEM_FITTING_COST,
  SHIELD_NONE,
  WEAPON_NONE,
} from "@neverquest/data/inventory";
import { inventory } from "@neverquest/state/inventory";
import { masteryStatistic } from "@neverquest/state/masteries";
import { essence } from "@neverquest/state/resources";
import type { Armor, Shield, Weapon } from "@neverquest/types";
import { isArmor, isRanged, isShield, isWeapon } from "@neverquest/types/type-guards";
import type { Gear } from "@neverquest/types/unions";
import { getElementalEffects } from "@neverquest/utilities/getters";
import { stackItems, withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const armor = withStateKey("armor", (key) =>
  selector({
    get: ({ get }) => {
      const equippedArmor = get(inventory).find((item) => {
        if (isArmor(item)) {
          return item.isEquipped;
        }

        return;
      });

      if (equippedArmor === undefined) {
        return ARMOR_NONE;
      }

      return equippedArmor as Armor;
    },
    key,
  }),
);

export const canApplyGem = withStateKey("canApplyGem", (key) =>
  selectorFamily<boolean, Gear>({
    get:
      (parameter) =>
      ({ get }) => {
        const { length } =
          parameter === "armor"
            ? get(armor).gems
            : parameter === "shield"
              ? get(shield).gems
              : get(weapon).gems;

        return (
          length < GEMS_MAXIMUM &&
          (GEM_FITTING_COST[length] ?? Number.POSITIVE_INFINITY) <= get(essence)
        );
      },
    key,
  }),
);

export const elementalEffects = withStateKey("elementalEffects", (key) =>
  selector({
    get: ({ get }) => {
      const effects = {
        armor: {
          fire: { damage: 0, duration: 0 },
          ice: { damage: 0, duration: 0 },
          lightning: { damage: 0, duration: 0 },
        },
        shield: {
          fire: 0,
          ice: 0,
          lightning: 0,
        },
        weapon: {
          fire: { damage: 0, duration: 0 },
          ice: { damage: 0, duration: 0 },
          lightning: { damage: 0, duration: 0 },
        },
      };

      const armorValue = get(armor);

      for (const { item, stack } of stackItems(armorValue.gems)) {
        effects.armor[GEM_ELEMENTALS[item.name]] = {
          damage: Math.ceil(armorValue.protection * (GEM_DAMAGE[stack - 1] ?? 0)),
          duration: GEM_DURATION[stack - 1] ?? 0,
        };
      }

      for (const { item, stack } of stackItems(get(shield).gems)) {
        effects.shield[GEM_ELEMENTALS[item.name]] = GEM_ENHANCEMENT[stack - 1] ?? 0;
      }

      const weaponValue = get(weapon);

      for (const { item, stack } of stackItems(weaponValue.gems)) {
        effects.weapon[GEM_ELEMENTALS[item.name]] = {
          damage: Math.ceil(weaponValue.damage * (GEM_DAMAGE[stack - 1] ?? 0)),
          duration: GEM_DURATION[stack - 1] ?? 0,
        };
      }

      return effects;
    },
    key,
  }),
);

export const range = withStateKey("range", (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon);

      return isRanged(weaponValue)
        ? weaponValue.range * (1 + get(masteryStatistic("marksmanship")))
        : 0;
    },
    key,
  }),
);

export const shield = withStateKey("shield", (key) =>
  selector({
    get: ({ get }) => {
      const equippedShield = get(inventory).find((item) => {
        if (isShield(item)) {
          return item.isEquipped;
        }

        return;
      });

      if (equippedShield === undefined) {
        return SHIELD_NONE;
      }

      return equippedShield as Shield;
    },
    key,
  }),
);

export const totalElementalEffects = withStateKey("totalElementalEffects", (key) =>
  selector({
    get: ({ get }) => {
      const { armor, shield, weapon } = get(elementalEffects);

      return {
        armor: {
          fire: getElementalEffects({ base: armor.fire, modifier: shield.fire }),
          ice: getElementalEffects({ base: armor.ice, modifier: shield.ice }),
          lightning: getElementalEffects({ base: armor.lightning, modifier: shield.lightning }),
        },
        weapon: {
          fire: getElementalEffects({ base: weapon.fire, modifier: shield.fire }),
          ice: getElementalEffects({ base: weapon.ice, modifier: shield.ice }),
          lightning: getElementalEffects({ base: weapon.lightning, modifier: shield.lightning }),
        },
      };
    },
    key,
  }),
);

export const weapon = withStateKey("weapon", (key) =>
  selector<Weapon | typeof WEAPON_NONE>({
    get: ({ get }) => {
      const equippedWeapon = get(inventory).find((item) => {
        if (isWeapon(item)) {
          return item.isEquipped;
        }

        return;
      });

      if (equippedWeapon === undefined) {
        return WEAPON_NONE;
      }

      return equippedWeapon as Weapon;
    },
    key,
  }),
);
