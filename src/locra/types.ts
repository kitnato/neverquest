export type Affix = "prefix" | "suffix";

export type AffixTag = "elemental" | "highQuality" | "lowQuality";

export type ArmorClass = "hide" | "plate" | "reinforced";

export type ArmorType = "chest" | "feet" | "hands" | "head" | "legs" | "shoulders" | "waist";

export type Artifact = "armor" | "shield" | "weapon";

export type ArtifactQuery =
  | {
      artifactClass?: ArmorClass;
      subtype?: ArmorType;
      type: "armor";
    }
  | {
      subtype?: ShieldType;
      type: "shield";
    }
  | {
      artifactClass?: WeaponClass;
      subtype?: WeaponType;
      type: "weapon";
    };

export type Category = "artifact" | "creature" | "location";

export type Creature = "human" | "monster" | "name";

export type GeneratorParameters = {
  hasPrefix: boolean;
  hasSuffix: boolean;
  isNSFW: boolean;
  prefixTags: AffixTag[];
  suffixTags: AffixTag[];
};

export type ShieldType = "medium" | "small" | "tower";

export const WeaponClasses = ["blunt", "piercing", "slashing"] as const;
export type WeaponClass = (typeof WeaponClasses)[number];

export type WeaponType = "melee" | "ranged";
