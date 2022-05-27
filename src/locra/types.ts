export enum AffixType {
  Prefix = "prefix",
  Suffix = "suffix",
}

export enum ArmorType {
  Chest = "chest",
  Feet = "feet",
  Head = "head",
  Hands = "hands",
  Legs = "legs",
  Shoulders = "shoulders",
  Waist = "waist",
}

export enum AffixTag {
  Elemental = "elemental",
  HighQuality = "highQuality",
  LowQuality = "lowQuality",
}

export type ArtifactQuery =
  | {
      subtype?: ArmorType;
      type: ArtifactType.Armor;
    }
  | {
      subtype?: ShieldType;
      type: ArtifactType.Shield;
    }
  | {
      subtype: undefined;
      type: ArtifactType.Trinket;
    }
  | {
      subtype?: WeaponType;
      type: ArtifactType.Weapon;
    };

export enum ArtifactType {
  Armor = "armor",
  Shield = "shield",
  Trinket = "trinket",
  Weapon = "weapon",
}

export enum Category {
  Artifact = "artifact",
  Creature = "creature",
  Location = "location",
}

export enum CreatureType {
  Human = "human",
  Monster = "monster",
  Name = "name",
}

export interface GeneratorParameters {
  hasPrefix: boolean;
  hasSuffix: boolean;
  isNSFW: boolean;
  prefixTags: AffixTag[];
  suffixTags: AffixTag[];
}

export enum ShieldType {
  Medium = "medium",
  Small = "small",
  Tower = "tower",
}

export enum WeaponType {
  Melee = "melee",
  Ranged = "ranged",
}
