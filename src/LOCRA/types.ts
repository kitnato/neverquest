export type Affix = "prefix" | "suffix";

export type AffixTag = "elemental" | "highQuality" | "lowQuality";

export type AffixData = BaseData & {
  artifact?: Affix;
  creature?: Affix;
  location?: Affix;
  tags?: AffixTag[];
};

export type ArmorClass = "hide" | "plate" | "reinforced";

type ArmorSlot = "chest" | "feet" | "hands" | "head" | "legs" | "shoulders" | "waist";

export type Artifact = "armor" | "shield" | "trinket" | "weapon";

export type ArtifactType<T extends Artifact> = { type: T };

export type ArtifactData = BaseData &
  (
    | ({
        subtype: ArmorSlot;
      } & ArtifactType<"armor">)
    | ({
        subtype: ShieldSize;
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
      subtype?: ShieldSize;
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
  hasPrefix: boolean;
  hasSuffix: boolean;
  isNSFW: boolean;
  prefixTags: AffixTag[];
  suffixTags: AffixTag[];
};

export type ShieldSize = "medium" | "small" | "tower";

export const WeaponClasses = ["blunt", "piercing", "slashing"] as const;
export type WeaponClass = (typeof WeaponClasses)[number];

export type WeaponModality = "melee" | "ranged";
