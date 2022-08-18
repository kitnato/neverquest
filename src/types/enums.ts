export enum ArmorClass {
  Hide = "Hide",
  Plate = "Plate",
  Reinforced = "Reinforced",
}

export enum AttributeType {
  AttackRateBonus,
  CriticalChance,
  CriticalDamage,
  Damage,
  DodgeChance,
  Health,
  HealthRegenerationRate,
  LootBonus,
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
  Essence,
  EssenceAbsorbed,
  EssenceLoot,
  Coins,
  CoinsLoot,
  DamagePerSecond,
  Health,
  HealthMonster,
  CharacterLevel,
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
  Caravan,
  Wilderness,
}

export enum LootType {
  Essence,
  Coins,
  Scrap,
}

export enum ShowingType {
  Armor,
  Attributes,
  AttributesButton,
  BlockChance,
  Coins,
  CrewHiring,
  Critical,
  DamagePerSecond,
  Defense,
  DodgeChance,
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

export enum SkillStatus {
  Trainable,
  Trained,
  Unavailable,
}

export enum SkillType {
  Criticals,
  Dodging,
  Parrying,
}

export enum StorageKey {
  Attributes = "attributes",
  AutoEquip = "autoEquip",
  CrewMapping = "crewMapping",
  CharacterLevel = "characterLevel",
  Coins = "coins",
  CoinsLoot = "coinsLoot",
  CrewHirable = "crewHirable",
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
  IsLooting = "isLooting",
  IsMonsterNew = "isMonsterNew",
  IsMonsterEngaged = "isMonsterEngaged",
  IsMonsterStaggered = "isMonsterStaggered",
  IsRecovering = "isRecovering",
  IsShowing = "isShowing",
  IsShowingDamagePerSecond = "isShowingDamagePerSecond",
  Level = "level",
  LootingRate = "lootingRate",
  LowHealthWarning = "lowHealthWarning",
  Mode = "mode",
  MonsterName = "monsterName",
  MonsterStatusElement = "monsterStatusElement",
  Name = "name",
  NSFW = "isNSFW",
  Progress = "progress",
  Scrap = "scrap",
  ScrapLoot = "scrapLoot",
  SkillsMapping = "skillsMapping",
  SkillsStatus = "skillsStatus",
  StatusElement = "statusElement",
}

export enum WeaponGrip {
  OneHanded,
  TwoHanded,
}
