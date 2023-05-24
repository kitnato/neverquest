import type {
  ArmorClass,
  ArtifactType,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRA/types";
import type { TrinketName } from "@neverquest/types";

export const MEDIC_PRICE_BANDAGES = 18;
export const MEDIC_PRICE_SURGERY = 6;
export const MEDIC_PRICE_SURGERY_CRITICAL = 15;

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
  | ({
      name: TrinketName;
    } & ArtifactType<"trinket">)
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
  [{ name: "Knapsack", type: "trinket" }],
  [
    { name: "Compass", type: "trinket" },
    { name: "Hearthstone", type: "trinket" },
  ],
  [
    {
      gearClass: "slashing",
      modality: "melee",
      type: "weapon",
    },
  ],
  [
    {
      gearClass: "blunt",
      modality: "melee",
      type: "weapon",
    },
  ],
  [
    {
      gearClass: "medium",
      type: "shield",
    },
  ],
  [
    {
      gearClass: "reinforced",
      type: "armor",
    },
  ],
];
