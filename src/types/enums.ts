export enum ArmorClass {
  Hide = "Hide",
  Plate = "Plate",
  Reinforced = "Reinforced",
}

export enum AttributeType {
  AttackRate,
  CriticalChance,
  CriticalDamage,
  Damage,
  DodgeChance,
  Health,
  HealthRegenerationRate,
  Loot,
  RecoveryRate,
  Stamina,
  StaminaRegenerationRate,
}

export enum CrewStatus {
  Hirable,
  Hired,
  Unavailable,
}

export enum CrewType {
  Blacksmith,
  Cook,
  Medic,
  Mercenary,
  Merchant,
  Tailor,
}

export enum DeltaType {
  CharacterLevel,
  Coins,
  CoinsLoot,
  DamagePerSecond,
  Essence,
  EssenceAbsorbed,
  EssenceLoot,
  Health,
  HealthMonster,
  MasteryBleed,
  MasteryParry,
  MasteryStagger,
  Scrap,
  ScrapLoot,
  Stamina,
  TotalAttackRate,
  TotalDamage,
  TotalHealthRegenerationRate,
  TotalProtection,
  TotalRecoveryRate,
  TotalStaminaRegenerationRate,
  WildernessLevel,
  WildernessProgress,
}

export enum LocationType {
  Caravan = "Caravan",
  Wilderness = "Wilderness",
}

export enum LootType {
  Coins,
  Essence,
  Scrap,
}

export enum MasteryType {
  BleedDamage,
  ParryDamage,
  StaggerDuration,
}

export enum ShowingType {
  Armor,
  AttributesButton,
  BlockChance,
  Coins,
  CrewHiring,
  Defense,
  Essence,
  GameOver,
  Loot,
  Recovery,
  Scrap,
  Shield,
  Stamina,
  TotalAttackRateSummary,
  TotalDamageSummary,
  TotalProtection,
  Weapon,
  WildernessStatus,
}

export enum SkillType {
  Armors = "Armorcraft",
  Bleed = "Bleed",
  Criticals = "Criticals",
  Dodge = "Dodge",
  Parry = "Parry",
  Regeneration = "Regeneration",
  Shields = "Shieldcraft",
  Stagger = "Stagger",
}

export enum StorageKey {
  Attributes = "attributes",
  AutoEquip = "autoEquip",
  CharacterLevel = "characterLevel",
  Coins = "coins",
  CoinsLoot = "coinsLoot",
  CrewHirable = "crewHirable",
  CrewMapping = "crewMapping",
  CurrentHealth = "currentHealth",
  CurrentHealthMonster = "currentHealthMonster",
  CurrentStamina = "currentStamina",
  Deltas = "deltas",
  EncumbranceMaximum = "encumbranceMaximum",
  Essence = "essence",
  EssenceLoot = "essenceLoot",
  HasKnapsack = "hasKnapsack",
  Inventory = "inventory",
  IsAttacking = "isAttacking",
  IsGameOver = "isGameOver",
  IsLevelStarted = "isLevelStarted",
  IsLooting = "isLooting",
  IsMonsterNew = "isMonsterNew",
  IsMonsterStaggered = "isMonsterStaggered",
  IsNSFW = "isNSFW",
  IsRecovering = "isRecovering",
  IsShowing = "isShowing",
  IsShowingDamagePerSecond = "isShowingDamagePerSecond",
  Level = "level",
  LootingRate = "lootingRate",
  LowHealthWarning = "lowHealthWarning",
  Masteries = "masteries",
  MerchantInventory = "merchantInventory",
  Mode = "mode",
  MonsterBleedingDuration = "monsterBleedingDuration",
  MonsterName = "monsterName",
  MonsterStatusElement = "monsterStatusElement",
  Name = "name",
  Progress = "progress",
  Scrap = "scrap",
  ScrapLoot = "scrapLoot",
  SkillsStatus = "skillsStatus",
  StatusElement = "statusElement",
  Wildernesses = "wildernesses",
  isInventoryOpen = "isInventoryOpen",
}

export enum WeaponGrip {
  OneHanded,
  TwoHanded,
}
