import { selector, selectorFamily } from "recoil";

import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import { GEMS_MAXIMUM, GEM_FITTING_COST } from "@neverquest/data/items";
import { inventory } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import type { Armor, Shield, Weapon } from "@neverquest/types";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";
import type { Gear } from "@neverquest/types/unions";
import { getGearElementalEffects, getTotalElementalEffects } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const armor = withStateKey("armor", (key) =>
  selector<Armor | typeof ARMOR_NONE>({
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
      (gear) =>
      ({ get }) => {
        const { length } =
          gear === "armor"
            ? get(armor).gems
            : gear === "shield"
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
      const armorEffects = getGearElementalEffects(get(armor));
      const shieldEffects = getGearElementalEffects(get(shield));
      const weaponEffects = getGearElementalEffects(get(weapon));

      return {
        armor: {
          fire: getTotalElementalEffects({ ...armorEffects.fire, modifier: shieldEffects.fire }),
          ice: getTotalElementalEffects({ ...armorEffects.ice, modifier: shieldEffects.ice }),
          lightning: getTotalElementalEffects({
            ...armorEffects.lightning,
            modifier: shieldEffects.lightning,
          }),
        },
        weapon: {
          fire: getTotalElementalEffects({ ...weaponEffects.fire, modifier: shieldEffects.fire }),
          ice: getTotalElementalEffects({ ...weaponEffects.ice, modifier: shieldEffects.ice }),
          lightning: getTotalElementalEffects({
            ...weaponEffects.lightning,
            modifier: shieldEffects.lightning,
          }),
        },
      };
    },
    key,
  }),
);

export const shield = withStateKey("shield", (key) =>
  selector<Shield | typeof SHIELD_NONE>({
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
