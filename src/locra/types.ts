export type Affix = "prefix" | "suffix";

export type AffixTag = "elemental" | "highQuality" | "lowQuality";

export type AffixData = BaseData & {
  artifact?: Affix;
  creature?: Affix;
  location?: Affix;
  tags?: AffixTag[];
};

export const ArmorClasses = ["hide", "reinforced", "plate"] as const;
export type ArmorClass = (typeof ArmorClasses)[number];

type ArmorSlot = "chest" | "feet" | "hands" | "head" | "legs" | "shoulders" | "waist";

export type Artifact = "armor" | "shield" | "trinket" | "weapon";

export type ArtifactType<T extends Artifact> = { type: T };

export type ArtifactData = BaseData &
  (
    | ({
        subtype: ArmorSlot;
      } & ArtifactType<"armor">)
    | ({
        subtype: ShieldClass;
      } & ArtifactType<"shield">)
    | ({
        artifactClass: WeaponClass;
        subtype: WeaponModality;
      } & ArtifactType<"weapon">)
    | ArtifactType<"trinket">
  );

export type ArtifactQuery =
  | ({
      artifactClass?: ArmorClass;
      subtype?: ArmorSlot;
    } & ArtifactType<"armor">)
  | ({
      subtype?: ShieldClass;
    } & ArtifactType<"shield">)
  | ArtifactType<"trinket">
  | ({
      artifactClass?: WeaponClass;
      subtype?: WeaponModality;
    } & ArtifactType<"weapon">);

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

export const ShieldClasses = ["small", "medium", "tower"] as const;
export type ShieldClass = (typeof ShieldClasses)[number];

export const WeaponClasses = ["blunt", "piercing", "slashing"] as const;
export type WeaponClass = (typeof WeaponClasses)[number];

export type WeaponModality = "melee" | "ranged";
