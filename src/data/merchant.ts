import { TRINKET_COMPASS, TRINKET_HEARTHSTONE, TRINKET_KNAPSACK } from "@neverquest/data/trinkets";
import { ArmorClass, ShieldType, WeaponClass, WeaponType } from "@neverquest/LOCRA/types";

export const MERCHANT_OFFERS = [
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
  [TRINKET_COMPASS, TRINKET_HEARTHSTONE],
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
] as const;
