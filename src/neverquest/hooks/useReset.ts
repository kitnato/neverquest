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
  merchantInventoryGenerated,
} from "neverquest/state/caravan";
import {
  characterLevel,
  hasKnapsack,
  isAttacking,
  isLooting,
  isRecovering,
  lootingRate,
  name,
  statusElement,
} from "neverquest/state/character";
import { gameOver, level, mode, progress } from "neverquest/state/global";
import { inventory, encumbranceMaximum } from "neverquest/state/inventory";
import {
  essence,
  essenceLoot,
  coins,
  coinsLoot,
  scrap,
  scrapLoot,
} from "neverquest/state/resources";
import {
  currentHealthMonster,
  isMonsterEngaged,
  isMonsterStaggered,
  monsterName,
  monsterStatusElement,
} from "neverquest/state/monster";
import { currentHealth, currentStamina, reservesInitial } from "neverquest/state/reserves";
import {
  showEssence,
  showArmor,
  showAttributes,
  showAttributesButton,
  showBlockChance,
  showCoins,
  showCritical,
  showDamagePerSecond,
  showDefense,
  showDodgeChance,
  showWildernessProgress,
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
  const resetEssence = useResetAtom(essence);
  const resetEssenceLoot = useResetAtom(essenceLoot);
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
  const resetDodgeChance = useResetAtom(dodgeChance);
  const resetExchangeCoin = useResetAtom(exchangeCoin);
  const resetExchangeScrap = useResetAtom(exchangeScrap);
  const resetGameOver = useResetAtom(gameOver);
  const resetHasKnapsack = useResetAtom(hasKnapsack);
  const resetHealth = useResetAtom(health);
  const resetHealthRegenerationRate = useResetAtom(healthRegenerationRate);
  const resetInventory = useResetAtom(inventory);
  const resetEncumbranceMaximum = useResetAtom(encumbranceMaximum);
  const resetIsAttacking = useResetAtom(isAttacking);
  const resetIsLooting = useResetAtom(isLooting);
  const resetIsMonsterEngaged = useResetAtom(isMonsterEngaged);
  const resetIsMonsterStaggered = useResetAtom(isMonsterStaggered);
  const resetIsRecovering = useResetAtom(isRecovering);
  const resetLevel = useResetAtom(level);
  const resetLootBonus = useResetAtom(lootBonus);
  const resetLootingRate = useResetAtom(lootingRate);
  const resetMerchantInventory = useResetAtom(merchantInventory);
  const resetMerchantInventoryGenerated = useResetAtom(merchantInventoryGenerated);
  const resetMode = useResetAtom(mode);
  const resetMonsterName = useResetAtom(monsterName);
  const resetMonsterStatusElement = useResetAtom(monsterStatusElement);
  const resetName = useResetAtom(name);
  const resetProgress = useResetAtom(progress);
  const resetRecoveryRate = useResetAtom(recoveryRate);
  const resetScrap = useResetAtom(scrap);
  const resetScrapLoot = useResetAtom(scrapLoot);
  const resetShowTrinket = useResetAtom(showTrinket);
  const resetShowEssence = useResetAtom(showEssence);
  const resetShowArmor = useResetAtom(showArmor);
  const resetShowAttributes = useResetAtom(showAttributes);
  const resetShowAttributesButton = useResetAtom(showAttributesButton);
  const resetShowBlockChance = useResetAtom(showBlockChance);
  const resetShowCoins = useResetAtom(showCoins);
  const resetShowCritical = useResetAtom(showCritical);
  const resetShowDamagePerSecond = useResetAtom(showDamagePerSecond);
  const resetShowDefense = useResetAtom(showDefense);
  const resetShowDodgeChance = useResetAtom(showDodgeChance);
  const resetShowWildernessProgress = useResetAtom(showWildernessProgress);
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
  const setInitialReserves = useSetAtom(reservesInitial);

  return () => {
    resetEssence();
    resetEssenceLoot();
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
    resetDodgeChance();
    resetExchangeCoin();
    resetExchangeScrap();
    resetGameOver();
    resetHasKnapsack();
    resetHealth();
    resetHealthRegenerationRate();
    resetInventory();
    resetEncumbranceMaximum();
    resetIsAttacking();
    resetIsLooting();
    resetIsMonsterEngaged();
    resetIsMonsterStaggered();
    resetIsRecovering();
    resetLevel();
    resetLootBonus();
    resetLootingRate();
    resetMerchantInventory();
    resetMerchantInventoryGenerated();
    resetMode();
    resetMonsterName();
    resetMonsterStatusElement();
    resetName();
    resetProgress();
    resetRecoveryRate();
    resetScrap();
    resetScrapLoot();
    resetShowEssence();
    resetShowArmor();
    resetShowAttributes();
    resetShowAttributesButton();
    resetShowBlockChance();
    resetShowCoins();
    resetShowCritical();
    resetShowDamagePerSecond();
    resetShowDefense();
    resetShowDodgeChance();
    resetShowWildernessProgress();
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
