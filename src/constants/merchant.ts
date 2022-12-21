import {
  ITEM_COMPASS,
  ITEM_HEARTHSTONE,
  ITEM_KNAPSACK,
  ITEM_LODESTONE,
} from "@neverquest/constants/items";
import { ShieldType, WeaponClass, WeaponType } from "@neverquest/locra/types";
import { Item } from "@neverquest/types";
import { ArmorClass } from "@neverquest/types/enums";

export const EXCHANGE_COINS = 1;

export const EXCHANGE_SCRAP = 3;

export const MERCHANT_OFFERS: (
  | Item
  | { type: WeaponType; weaponClass: WeaponClass }
  | { armorClass: ArmorClass }
  | { type: ShieldType }
)[][] = [
  [
    {
      type: WeaponType.Melee,
      weaponClass: WeaponClass.Piercing,
    },
  ],
  [
    {
      armorClass: ArmorClass.Hide,
    },
  ],
  [
    {
      type: ShieldType.Small,
    },
  ],
  [ITEM_KNAPSACK],
  [ITEM_LODESTONE, ITEM_COMPASS, ITEM_HEARTHSTONE],
  [
    {
      type: WeaponType.Melee,
      weaponClass: WeaponClass.Slashing,
    },
    {
      type: WeaponType.Melee,
      weaponClass: WeaponClass.Blunt,
    },
    {
      armorClass: ArmorClass.Reinforced,
    },
    {
      type: ShieldType.Medium,
    },
    {
      type: ShieldType.Tower,
    },
  ],
];
