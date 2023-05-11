import { TRINKET_COMPASS, TRINKET_HEARTHSTONE, TRINKET_KNAPSACK } from "@neverquest/data/trinkets";
import type {
  ArmorClass,
  ArtifactType,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRA/types";
import type { Trinket } from "@neverquest/types";

export const MERCHANT_OFFERS: (
  | ({
      gearClass: ArmorClass;
    } & ArtifactType<"armor">)
  | ({
      gearClass: ShieldClass;
    } & ArtifactType<"shield">)
  | ({
      gearClass: WeaponClass;
      modality: WeaponModality;
    } & ArtifactType<"weapon">)
  | Trinket
)[][] = [
  [
    {
      gearClass: "piercing",
      modality: "melee",
      type: "weapon",
    },
  ],
  [
    {
      gearClass: "hide",
      type: "armor",
    },
  ],
  [
    {
      gearClass: "small",
      type: "shield",
    },
  ],
  [TRINKET_KNAPSACK],
  [TRINKET_COMPASS, TRINKET_HEARTHSTONE],
  [
    {
      gearClass: "slashing",
      modality: "melee",
      type: "weapon",
    },
    {
      gearClass: "blunt",
      modality: "melee",
      type: "weapon",
    },
    {
      gearClass: "reinforced",
      type: "armor",
    },
    {
      gearClass: "medium",
      type: "shield",
    },
    {
      gearClass: "tower",
      type: "shield",
    },
  ],
];
