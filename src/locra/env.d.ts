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

export type AffixTags = "elemental" | "highQuality" | "lowQuality";

export enum ArtifactType {
  Accessory = "accessory",
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

// export type DBAffix = { nsfw: boolean } & Partial<{
//   artifact: AffixType;
//   creature: AffixType;
//   location: AffixType;
//   tags: DBAffixTags[];
// }>;

// export type DBArtifact = { nsfw: boolean } & (
//   | {
//       type: ArtifactType.Accessory;
//     }
//   | {
//       type: ArtifactType.Armor;
//       subtype: ArmorType;
//     }
//   | {
//       type: ArtifactType.Shield;
//       subtype: ShieldType;
//     }
//   | {
//       type: ArtifactType.Weapon;
//       subtype: WeaponType;
//     }
// );

// export type DBCreature = { nsfw: boolean } & { type: CreatureType };

export enum ShieldType {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum WeaponType {
  Magic = "magic",
  Melee = "melee",
  Ranged = "ranged",
}
