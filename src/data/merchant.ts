import {
  TRINKET_COMPASS,
  TRINKET_HEARTHSTONE,
  TRINKET_KNAPSACK,
  TRINKET_LODESTONE,
} from "@neverquest/data/trinkets";
import { ShieldType, WeaponClass, WeaponType } from "@neverquest/locra/types";
import { Trinket } from "@neverquest/types";
import { ArmorClass } from "@neverquest/types/enums";

export const MERCHANT_OFFERS: (
  | Trinket
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
  [TRINKET_KNAPSACK],
  [TRINKET_LODESTONE, TRINKET_COMPASS, TRINKET_HEARTHSTONE],
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
