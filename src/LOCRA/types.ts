export enum AffixType {
  Prefix = "prefix",
  Suffix = "suffix",
}

export enum ArmorType {
  Chest = "chest",
  Feet = "feet",
  Hands = "hands",
  Head = "head",
  Legs = "legs",
  Shoulders = "shoulders",
  Waist = "waist",
}

export enum AffixTag {
  Elemental = "elemental",
  HighQuality = "highQuality",
  LowQuality = "lowQuality",
}

export interface ArmorQuery {
  subtype?: ArmorType;
  type: ArtifactType.Armor;
}

export enum ArtifactType {
  Armor = "armor",
  Shield = "shield",
  Weapon = "weapon",
}

export interface ShieldQuery {
  subtype?: ShieldType;
  type: ArtifactType.Shield;
}
export interface WeaponQuery {
  subtype?: WeaponType;
  type: ArtifactType.Weapon;
  weaponClass: WeaponClass;
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

export enum WeaponClass {
  Blunt = "blunt",
  Piercing = "piercing",
  Slashing = "slashing",
}

export enum WeaponType {
  Melee = "melee",
  Ranged = "ranged",
}
