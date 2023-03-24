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

export enum DeltaTextType {
  Number,
  Percentage,
  Time,
}

export enum DeltaType {
  AttackRate,
  BleedRating,
  BlockChance,
  ChanceFreeBlock,
  ChanceSkipRecovery,
  CharacterLevel,
  Coins,
  CoinsLoot,
  CriticalRating,
  Damage,
  DamagePerSecond,
  Deflection,
  DodgeChance,
  Essence,
  EssenceAbsorbed,
  EssenceLoot,
  Health,
  HealthMonster,
  HealthRegenerationRate,
  MasteryBleed,
  MasteryParry,
  MasteryStagger,
  ParryChance,
  Protection,
  RecoveryRate,
  Scrap,
  ScrapLoot,
  StaggerRating,
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
  AttackRate,
  AttackRateDetails,
  AttributesButton,
  BlockChance,
  Coins,
  CrewHiring,
  DamageDetails,
  Defense,
  Deflection,
  DodgeChanceDetails,
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
  AttackDuration = "attackDuration",
  Attributes = "attributes",
  AutoEquip = "autoEquip",
  CharacterLevel = "characterLevel",
  Coins = "coins",
  CoinsLoot = "coinsLoot",
  CrewActive = "crewActive",
  CrewHirable = "crewHirable",
  CrewMapping = "crewMapping",
  CurrentHealth = "currentHealth",
  CurrentStamina = "currentStamina",
  Deltas = "deltas",
  EncumbranceMaximum = "encumbranceMaximum",
  Essence = "essence",
  EssenceLoot = "essenceLoot",
  FloatingTextQueues = "floatingTextQueues",
  HasBoughtFromMerchant = "hasBoughtFromMerchant",
  HasKnapsack = "hasKnapsack",
  HealthRegenerationDuration = "HealthRegenerationDuration",
  Inventory = "inventory",
  IsAttacking = "isAttacking",
  IsGameOver = "isGameOver",
  IsLevelStarted = "isLevelStarted",
  IsMonsterNew = "isMonsterNew",
  IsNSFW = "isNSFW",
  IsShowing = "isShowing",
  IsShowingDamagePerSecond = "isShowingDamagePerSecond",
  Level = "level",
  LootingDuration = "lootingDuration",
  LootingRate = "lootingRate",
  LowHealthWarning = "lowHealthWarning",
  Masteries = "masteries",
  MerchantInventory = "merchantInventory",
  Mode = "mode",
  MonsterAttackDuration = "monsterAttackDuration",
  MonsterBleedingDelta = "monsterBleedingDelta",
  MonsterBleedingDuration = "monsterBleedingDuration",
  MonsterCurrentHealth = "monsterCurrentHealth",
  MonsterElement = "monsterElement",
  MonsterName = "monsterName",
  MonsterStaggeredDuration = "monsterStaggeredDuration",
  Name = "name",
  PoisonDuration = "poisonDuration",
  PoisonedDelta = "poisonedDelta",
  Progress = "progress",
  RecoveryDuration = "recoveryDuration",
  Scrap = "scrap",
  ScrapLoot = "scrapLoot",
  SkillsStatus = "skillsStatus",
  StaminaDebuff = "staminaDebuff",
  StaminaRegenerationDuration = "StaminaRegenerationDuration",
  StatusElement = "statusElement",
  Wildernesses = "wildernesses",
  isInventoryOpen = "isInventoryOpen",
}

export enum WeaponGrip {
  OneHanded,
  TwoHanded,
}
