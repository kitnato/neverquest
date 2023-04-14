import { TRINKET_COMPASS, TRINKET_HEARTHSTONE, TRINKET_KNAPSACK } from "@neverquest/data/trinkets";
import type { ArmorClass, ShieldType, WeaponClass, WeaponType } from "@neverquest/LOCRA/types";
import type { Trinket } from "@neverquest/types";

// TODO - make sure artifact keys are typed as Artifact.
type MerchantOffer =
  | { artifact: "armor"; artifactClass: ArmorClass }
  | { artifact: "shield"; type: ShieldType }
  | { artifact: "weapon"; artifactClass: WeaponClass; type: WeaponType }
  | Trinket;

export const MERCHANT_OFFERS: MerchantOffer[][] = [
  [
    {
      artifact: "weapon",
      artifactClass: "piercing",
      type: "melee",
    },
  ],
  [
    {
      artifact: "armor",
      artifactClass: "hide",
    },
  ],
  [
    {
      artifact: "shield",
      type: "small",
    },
  ],
  [TRINKET_KNAPSACK],
  [TRINKET_COMPASS, TRINKET_HEARTHSTONE],
  [
    {
      artifact: "weapon",
      artifactClass: "slashing",
      type: "melee",
    },
    {
      artifact: "weapon",
      artifactClass: "blunt",
      type: "melee",
    },
    {
      artifact: "armor",
      artifactClass: "reinforced",
    },
    {
      artifact: "shield",
      type: "medium",
    },
    {
      artifact: "shield",
      type: "tower",
    },
  ],
];
