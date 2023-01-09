export enum ArmorClass {
  Hide,
  Plate,
  Reinforced,
}

export enum AttributeType {
  AttackRate,
  CriticalChance,
  CriticalDamage,
  Damage,
  DodgeChance,
  Health,
  Loot,
  RecoveryRate,
  ReserveRegenerationAmount,
  ReserveRegenerationRate,
  Stamina,
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
  AttackRate,
  ChanceFreeBlock,
  ChanceSkipRecovery,
  CharacterLevel,
  Coins,
  CoinsLoot,
  Damage,
  DamagePerSecond,
  Deflection,
  Essence,
  EssenceAbsorbed,
  EssenceLoot,
  Health,
  HealthMonster,
  HealthRegenerationRate,
  MasteryBleed,
  MasteryParry,
  MasteryStagger,
  Protection,
  RecoveryRate,
  Scrap,
  ScrapLoot,
  Stamina,
  StaminaRegenerationRate,
  WildernessLevel,
  WildernessProgress,
}

export enum LocationType {
  Caravan,
  Wilderness,
}

export enum LootType {
  Coins,
  Essence,
  Scrap,
}

export enum MasteryType {
  BleedDamage,
  FreeBlockChance,
  ParryFactor,
  SkipRecoveryChance,
  StaggerDuration,
}

export enum ShowingType {
  Armor,
  AttackRateSummary,
  AttributesButton,
  BlockChance,
  Coins,
  CrewHiring,
  DamageSummary,
  Defense,
  Deflection,
  Essence,
  GameOver,
  Loot,
  Protection,
  Recovery,
  Scrap,
  Shield,
  Stamina,
  Weapon,
  WildernessStatus,
}

export enum ReserveType {
  Encumbrance,
  Health,
  MonsterHealth,
  Stamina,
}

export enum SkillType {
  Armors,
  Bleed,
  Criticals,
  Dodge,
  Parry,
  Regeneration,
  Shields,
  Stagger,
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
  MonsterCurrentHealth = "monsterCurrentHealth",
  MonsterName = "monsterName",
  MonsterStatusElement = "monsterStatusElement",
  Name = "name",
  PoisonDuration = "poisonDuration",
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
