type Affix = "articledSuffix" | "prefix" | "suffix";

export type AffixTag = "elemental" | "highQuality" | "lowQuality";

export type AffixData = BaseData & {
  artifact?: Affix[];
  creature?: Affix[];
  location?: Affix[];
  tags?: AffixTag[];
};

export const ARMOR_CLASS_TYPES = ["light", "reinforced", "heavy"] as const;
export type ArmorClass = (typeof ARMOR_CLASS_TYPES)[number];

type ArmorSlot = "chest" | "feet" | "hands" | "head" | "legs" | "shoulders" | "waist";

type Artifact = "armor" | "shield" | "trinket" | "weapon";

export type ArtifactType<T extends Artifact> = { type: T };

export type ArtifactData = BaseData & {
  canPluralize?: boolean;
} & (
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

export type Creature = "human" | "monster";

export type CreatureData = BaseData & {
  type: Creature;
};

export type GeneratorParameters = Partial<{
  allowNSFW: boolean;
  nameStructure: NameStructure;
  prefixTags: AffixTag[];
  suffixTags: AffixTag[];
}>;

export type LocationData = BaseData & {
  canPluralize?: boolean;
};

export type NameData = BaseData & {
  type: Affix[];
};

export const NAME_STRUCTURE_TYPES = ["none", "prefix", "prefixAndSuffix", "suffix"] as const;
export type NameStructure = (typeof NAME_STRUCTURE_TYPES)[number];

export const SHIELD_CLASS_TYPES = ["small", "medium", "tower"] as const;
export type ShieldClass = (typeof SHIELD_CLASS_TYPES)[number];

export const WEAPON_CLASS_TYPES = ["blunt", "piercing", "slashing"] as const;
export type WeaponClass = (typeof WEAPON_CLASS_TYPES)[number];

export type WeaponModality = "melee" | "ranged";
