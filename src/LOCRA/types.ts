export enum AffixTag {
  Elemental = "elemental",
  HighQuality = "highQuality",
  LowQuality = "lowQuality",
}

export enum AffixType {
  Prefix = "prefix",
  Suffix = "suffix",
}

export enum ArmorClass {
  Hide = "hide",
  Plate = "plate",
  Reinforced = "reinforced",
}

export interface ArmorQuery {
  subtype?: ArmorType;
  type: ArtifactType.Armor;
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

export enum ArtifactType {
  Armor = "armor",
  Shield = "shield",
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

export interface ShieldQuery {
  subtype?: ShieldType;
  type: ArtifactType.Shield;
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

export interface WeaponQuery {
  subtype?: WeaponType;
  type: ArtifactType.Weapon;
  weaponClass: WeaponClass;
}

export enum WeaponType {
  Melee = "melee",
  Ranged = "ranged",
}
