import { ShieldType, WeaponType } from "locra/types";
import {
  ITEM_COMPASS,
  ITEM_HEARTHSTONE,
  ITEM_KNAPSACK,
} from "neverquest/utilities/constants-items";
import { ArmorClass, Item, WeaponClass } from "neverquest/types/core";

export const ANIMATE_DURATION_PROPERTY = "--animate-duration";
export const ANIMATE_PREFIX = "animate__";
export const ANIMATED_CLASS = `${ANIMATE_PREFIX}animated`;

export const DELTA_DEFAULT = {
  color: null,
  value: "",
};

export const MERCHANT_OFFERS: Record<
  number,
  (
    | Item
    | { type: WeaponType; weaponClass: WeaponClass }
    | { armorClass: ArmorClass }
    | { type: ShieldType }
  )[]
> = {
  1: [
    {
      type: WeaponType.Melee,
      weaponClass: WeaponClass.Light,
    },
  ],
  2: [
    {
      armorClass: ArmorClass.Hide,
    },
  ],
  3: [
    {
      type: ShieldType.Small,
    },
  ],
  4: [ITEM_KNAPSACK],
  5: [
    {
      type: WeaponType.Melee,
      weaponClass: WeaponClass.Balanced,
    },
    {
      armorClass: ArmorClass.Reinforced,
    },
    {
      type: ShieldType.Medium,
    },
  ],
  6: [ITEM_COMPASS],
  7: [
    {
      type: WeaponType.Melee,
      weaponClass: WeaponClass.Heavy,
    },
    {
      type: ShieldType.Tower,
    },
  ],
  8: [ITEM_HEARTHSTONE],
};

export const TRANSPARENT_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export const UNKNOWN = "???";
