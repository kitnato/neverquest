import { TRINKET_COMPASS, TRINKET_HEARTHSTONE, TRINKET_KNAPSACK } from "@neverquest/data/trinkets";
import type {
  ArmorClass,
  ArtifactType,
  ShieldSize,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRA/types";
import type { Trinket } from "@neverquest/types";

export const MERCHANT_OFFERS: (
  | ({
      gearClass: ArmorClass;
    } & ArtifactType<"armor">)
  | ({
      size: ShieldSize;
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
      size: "small",
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
      size: "medium",
      type: "shield",
    },
    {
      size: "tower",
      type: "shield",
    },
  ],
];
