import { useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";

import {
  attackRateBonus,
  criticalChance,
  criticalDamage,
  damage,
  dodgeChance,
  health,
  healthRegenerationRate,
  lootBonus,
  recoveryRate,
  stamina,
  staminaRegenerationRate,
} from "neverquest/state/attributes";
import {
  crew,
  crewMonologues,
  exchangeCoin,
  exchangeScrap,
  merchantInventory,
} from "neverquest/state/caravan";
import {
  characterLevel,
  experience,
  experienceSpent,
  isAttacking,
  isLooting,
  isRecovering,
  lootingRate,
  name,
  statusElement,
} from "neverquest/state/character";
import {
  deltaAether,
  deltaAetherLoot,
  deltaCoins,
  deltaCoinsLoot,
  deltaDamagePerSecond,
  deltaExperience,
  deltaExperienceSpent,
  deltaHealth,
  deltaHealthMonster,
  deltaCharacterLevel,
  deltaScrap,
  deltaScrapLoot,
  deltaStamina,
  deltaTotalAttackRate,
  deltaTotalDamage,
  deltaTotalHealthRegenerationRate,
  deltaTotalProtection,
  deltaTotalRecoveryRate,
  deltaTotalStaminaRegenerationRate,
} from "neverquest/state/deltas";
import { gameOver, level, mode, progress } from "neverquest/state/global";
import { inventory, inventorySize } from "neverquest/state/inventory";
import { aether, aetherLoot, coins, coinsLoot, scrap, scrapLoot } from "neverquest/state/resources";
import {
  currentHealthMonster,
  isMonsterEngaged,
  isMonsterStaggered,
  monsterName,
  monsterStatusElement,
} from "neverquest/state/monster";
import { currentHealth, currentStamina, initializeReserves } from "neverquest/state/reserves";
import {
  showAether,
  showArmor,
  showAttributes,
  showAttributesButton,
  showBlockChance,
  showCharacterLevel,
  showCoins,
  showCritical,
  showDamagePerSecond,
  showDefense,
  showDodgeChance,
  showInventoryButton,
  showLevelProgress,
  showLoot,
  showRecovery,
  showScrap,
  showShield,
  showStamina,
  showTotalAttackRateSummary,
  showTotalDamageSummary,
  showTotalProtection,
  showTrinket,
  showWeapon,
} from "neverquest/state/show";

// (ﾉ☉ヮ⚆)ﾉ ⌒*:･ﾟ✧
export default function useReset() {
  const resetAether = useResetAtom(aether);
  const resetAetherLoot = useResetAtom(aetherLoot);
  const resetAttackRateBonus = useResetAtom(attackRateBonus);
  const resetCharacterLevel = useResetAtom(characterLevel);
  const resetCoins = useResetAtom(coins);
  const resetCoinsLoot = useResetAtom(coinsLoot);
  const resetCrew = useResetAtom(crew);
  const resetCrewMonologues = useResetAtom(crewMonologues);
  const resetCriticalChance = useResetAtom(criticalChance);
  const resetCriticalDamage = useResetAtom(criticalDamage);
  const resetCurrentHealth = useResetAtom(currentHealth);
  const resetCurrentHealthMonster = useResetAtom(currentHealthMonster);
  const resetCurrentStamina = useResetAtom(currentStamina);
  const resetDamage = useResetAtom(damage);
  const resetDeltaAether = useResetAtom(deltaAether);
  const resetDeltaAetherLoot = useResetAtom(deltaAetherLoot);
  const resetDeltaCharacterLevel = useResetAtom(deltaCharacterLevel);
  const resetDeltaCoins = useResetAtom(deltaCoins);
  const resetDeltaCoinsLoot = useResetAtom(deltaCoinsLoot);
  const resetDeltaDamagePerSecond = useResetAtom(deltaDamagePerSecond);
  const resetDeltaExperience = useResetAtom(deltaExperience);
  const resetDeltaExperienceSpent = useResetAtom(deltaExperienceSpent);
  const resetDeltaHealth = useResetAtom(deltaHealth);
  const resetDeltaHealthMonster = useResetAtom(deltaHealthMonster);
  const resetDeltaScrap = useResetAtom(deltaScrap);
  const resetDeltaScrapLoot = useResetAtom(deltaScrapLoot);
  const resetDeltaStamina = useResetAtom(deltaStamina);
  const resetDeltaTotalAttackRate = useResetAtom(deltaTotalAttackRate);
  const resetDeltaTotalDamage = useResetAtom(deltaTotalDamage);
  const resetDeltaTotalHealthRegenerationRate = useResetAtom(deltaTotalHealthRegenerationRate);
  const resetDeltaTotalProtection = useResetAtom(deltaTotalProtection);
  const resetDeltaTotalRecoveryRate = useResetAtom(deltaTotalRecoveryRate);
  const resetDeltaTotalStaminaRegenerationRate = useResetAtom(deltaTotalStaminaRegenerationRate);
  const resetDodgeChance = useResetAtom(dodgeChance);
  const resetExchangeCoin = useResetAtom(exchangeCoin);
  const resetExchangeScrap = useResetAtom(exchangeScrap);
  const resetExperience = useResetAtom(experience);
  const resetExperienceSpent = useResetAtom(experienceSpent);
  const resetGameOver = useResetAtom(gameOver);
  const resetHealth = useResetAtom(health);
  const resetHealthRegenerationRate = useResetAtom(healthRegenerationRate);
  const resetInventory = useResetAtom(inventory);
  const resetInventorySize = useResetAtom(inventorySize);
  const resetIsAttacking = useResetAtom(isAttacking);
  const resetIsLooting = useResetAtom(isLooting);
  const resetIsMonsterEngaged = useResetAtom(isMonsterEngaged);
  const resetIsMonsterStaggered = useResetAtom(isMonsterStaggered);
  const resetIsRecovering = useResetAtom(isRecovering);
  const resetLevel = useResetAtom(level);
  const resetLootBonus = useResetAtom(lootBonus);
  const resetLootingRate = useResetAtom(lootingRate);
  const resetMerchantInventory = useResetAtom(merchantInventory);
  const resetMode = useResetAtom(mode);
  const resetMonsterName = useResetAtom(monsterName);
  const resetMonsterStatusElement = useResetAtom(monsterStatusElement);
  const resetName = useResetAtom(name);
  const resetProgress = useResetAtom(progress);
  const resetRecoveryRate = useResetAtom(recoveryRate);
  const resetScrap = useResetAtom(scrap);
  const resetScrapLoot = useResetAtom(scrapLoot);
  const resetShowTrinket = useResetAtom(showTrinket);
  const resetShowAether = useResetAtom(showAether);
  const resetShowArmor = useResetAtom(showArmor);
  const resetShowAttributes = useResetAtom(showAttributes);
  const resetShowAttributesButton = useResetAtom(showAttributesButton);
  const resetShowBlockChance = useResetAtom(showBlockChance);
  const resetShowCharacterLevel = useResetAtom(showCharacterLevel);
  const resetShowCoins = useResetAtom(showCoins);
  const resetShowCritical = useResetAtom(showCritical);
  const resetShowDamagePerSecond = useResetAtom(showDamagePerSecond);
  const resetShowDefense = useResetAtom(showDefense);
  const resetShowDodgeChance = useResetAtom(showDodgeChance);
  const resetShowInventoryButton = useResetAtom(showInventoryButton);
  const resetShowLevelProgress = useResetAtom(showLevelProgress);
  const resetShowLoot = useResetAtom(showLoot);
  const resetShowRecovery = useResetAtom(showRecovery);
  const resetShowScrap = useResetAtom(showScrap);
  const resetShowShield = useResetAtom(showShield);
  const resetShowStamina = useResetAtom(showStamina);
  const resetShowTotalAttackRateSummary = useResetAtom(showTotalAttackRateSummary);
  const resetShowTotalDamageSummary = useResetAtom(showTotalDamageSummary);
  const resetShowTotalProtection = useResetAtom(showTotalProtection);
  const resetShowWeapon = useResetAtom(showWeapon);
  const resetStamina = useResetAtom(stamina);
  const resetStaminaRegenerationRate = useResetAtom(staminaRegenerationRate);
  const resetStatusElement = useResetAtom(statusElement);
  const setInitialReserves = useSetAtom(initializeReserves);

  return () => {
    resetAether();
    resetAetherLoot();
    resetAttackRateBonus();
    resetCharacterLevel();
    resetCoins();
    resetCoinsLoot();
    resetCrew();
    resetCrewMonologues();
    resetCriticalChance();
    resetCriticalDamage();
    resetCurrentHealth();
    resetCurrentHealthMonster();
    resetCurrentStamina();
    resetDamage();
    resetDeltaAether();
    resetDeltaAetherLoot();
    resetDeltaCharacterLevel();
    resetDeltaCoins();
    resetDeltaCoinsLoot();
    resetDeltaDamagePerSecond();
    resetDeltaExperience();
    resetDeltaExperienceSpent();
    resetDeltaHealth();
    resetDeltaHealthMonster();
    resetDeltaScrap();
    resetDeltaScrapLoot();
    resetDeltaStamina();
    resetDeltaTotalAttackRate();
    resetDeltaTotalDamage();
    resetDeltaTotalHealthRegenerationRate();
    resetDeltaTotalProtection();
    resetDeltaTotalRecoveryRate();
    resetDeltaTotalStaminaRegenerationRate();
    resetDodgeChance();
    resetExchangeCoin();
    resetExchangeScrap();
    resetExperience();
    resetExperienceSpent();
    resetGameOver();
    resetHealth();
    resetHealthRegenerationRate();
    resetInventory();
    resetInventorySize();
    resetIsAttacking();
    resetIsLooting();
    resetIsMonsterEngaged();
    resetIsMonsterStaggered();
    resetIsRecovering();
    resetLevel();
    resetLootBonus();
    resetLootingRate();
    resetMerchantInventory();
    resetMode();
    resetMonsterName();
    resetMonsterStatusElement();
    resetName();
    resetProgress();
    resetRecoveryRate();
    resetScrap();
    resetScrapLoot();
    resetShowAether();
    resetShowArmor();
    resetShowAttributes();
    resetShowAttributesButton();
    resetShowBlockChance();
    resetShowCharacterLevel();
    resetShowCoins();
    resetShowCritical();
    resetShowDamagePerSecond();
    resetShowDefense();
    resetShowDodgeChance();
    resetShowInventoryButton();
    resetShowLevelProgress();
    resetShowLoot();
    resetShowRecovery();
    resetShowScrap();
    resetShowShield();
    resetShowStamina();
    resetShowTotalAttackRateSummary();
    resetShowTotalDamageSummary();
    resetShowTotalProtection();
    resetShowTrinket();
    resetShowWeapon();
    resetStamina();
    resetStaminaRegenerationRate();
    resetStatusElement();
    setInitialReserves();
  };
}
