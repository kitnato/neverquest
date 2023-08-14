type Affix = "prefix" | "suffix";

export type AffixTag = "elemental" | "highQuality" | "lowQuality";

export type AffixData = BaseData & {
  artifact?: Affix;
  creature?: Affix;
  location?: Affix;
  tags?: AffixTag[];
};

export const ARMOR_CLASSES = ["hide", "reinforced", "plate"] as const;
export type ArmorClass = (typeof ARMOR_CLASSES)[number];

type ArmorSlot = "chest" | "feet" | "hands" | "head" | "legs" | "shoulders" | "waist";

type Artifact = "armor" | "shield" | "trinket" | "weapon";

export type ArtifactType<T extends Artifact> = { type: T };

export type ArtifactData = BaseData &
  (
    | ArtifactType<"trinket">
    | (ArtifactType<"armor"> & {
        subtype: ArmorSlot;
      })
    | (ArtifactType<"shield"> & {
        subtype: ShieldClass;
      })
    | (ArtifactType<"weapon"> & {
        artifactClass: WeaponClass;
        subtype: WeaponModality;
      })
  );

export type ArtifactQuery =
  | ArtifactType<"trinket">
  | (ArtifactType<"armor"> & {
      artifactClass?: ArmorClass;
      subtype?: ArmorSlot;
    })
  | (ArtifactType<"shield"> & {
      subtype?: ShieldClass;
    })
  | (ArtifactType<"weapon"> & {
      artifactClass?: WeaponClass;
      subtype?: WeaponModality;
    });

export type BaseData = { isNSFW?: boolean; name: string };

export type Category = "artifact" | "creature" | "location";

export type Creature = "human" | "monster" | "name";

export type CreatureData = BaseData & {
  type: Creature;
};

export type GeneratorParameters = {
  allowNSFW: boolean;
  hasPrefix: boolean;
  hasSuffix: boolean;
  prefixTags: AffixTag[];
  suffixTags: AffixTag[];
};

export type LocationData = BaseData & {
  canPluralize?: boolean;
};

export const SHIELD_CLASSES = ["small", "medium", "tower"] as const;
export type ShieldClass = (typeof SHIELD_CLASSES)[number];

export const WEAPON_CLASSES = ["blunt", "piercing", "slashing"] as const;
export type WeaponClass = (typeof WEAPON_CLASSES)[number];

export type WeaponModality = "melee" | "ranged";
