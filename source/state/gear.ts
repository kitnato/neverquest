import { atom, selector, selectorFamily } from "recoil";

import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import { GEMS_MAXIMUM, GEM_FITTING_COST_RANGE } from "@neverquest/data/items";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { essence } from "@neverquest/state/resources";
import type { Armor, Shield, Weapon } from "@neverquest/types";
import type { Gear } from "@neverquest/types/unions";
import {
  getFromRange,
  getGearElementalEffects,
  getTotalElementalEffects,
} from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const armor = withStateKey("armor", (key) =>
  selector<Armor | typeof ARMOR_NONE>({
    get: ({ get }) => {
      const equippedArmorValue = get(equippedArmor);

      if (equippedArmorValue === undefined) {
        return ARMOR_NONE;
      }

      return equippedArmorValue;
    },
    key,
  }),
);

export const canApplyGem = withStateKey("canApplyGem", (key) =>
  selectorFamily({
    get:
      (gear: Gear) =>
      ({ get }) => {
        const { length } =
          gear === "armor"
            ? get(armor).gems
            : gear === "shield"
              ? get(shield).gems
              : get(weapon).gems;

        return (
          length < GEMS_MAXIMUM &&
          getFromRange({ factor: (length - 1) / (GEMS_MAXIMUM - 1), ...GEM_FITTING_COST_RANGE }) <=
            get(essence)
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
      const equippedShieldValue = get(equippedShield);

      if (equippedShieldValue === undefined) {
        return SHIELD_NONE;
      }

      return equippedShieldValue;
    },
    key,
  }),
);

export const weapon = withStateKey("weapon", (key) =>
  selector<Weapon | typeof WEAPON_NONE>({
    get: ({ get }) => {
      const equippedWeaponValue = get(equippedWeapon);

      if (equippedWeaponValue === undefined) {
        return WEAPON_NONE;
      }

      return equippedWeaponValue;
    },
    key,
  }),
);

// ATOMS

export const equippedArmor = withStateKey("equippedArmor", (key) =>
  atom<Armor | undefined>({
    default: undefined,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const equippedShield = withStateKey("equippedShield", (key) =>
  atom<Shield | undefined>({
    default: undefined,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const equippedWeapon = withStateKey("equippedWeapon", (key) =>
  atom<Weapon | undefined>({
    default: undefined,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
