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
      artifactClass: ArmorClass;
    } & ArtifactType<"armor">)
  | ({
      size: ShieldSize;
    } & ArtifactType<"shield">)
  | ({
      artifactClass: WeaponClass;
      modality: WeaponModality;
    } & ArtifactType<"weapon">)
  | Trinket
)[][] = [
  [
    {
      artifactClass: "piercing",
      modality: "melee",
      type: "weapon",
    },
  ],
  [
    {
      artifactClass: "hide",
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
      artifactClass: "slashing",
      modality: "melee",
      type: "weapon",
    },
    {
      artifactClass: "blunt",
      modality: "melee",
      type: "weapon",
    },
    {
      artifactClass: "reinforced",
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
