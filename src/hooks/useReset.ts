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
} from "@neverquest/state/attributes";
import { crew, exchangeCoin, exchangeScrap, merchantInventory } from "@neverquest/state/caravan";
import {
  characterLevel,
  hasKnapsack,
  isAttacking,
  isLooting,
  isRecovering,
  lootingRate,
  name,
  statusElement,
} from "@neverquest/state/character";
import { level, mode, progress } from "@neverquest/state/encounter";
import { autoEquip, gameOver, initialization } from "@neverquest/state/global";
import { encumbranceMaximum, inventory } from "@neverquest/state/inventory";
import {
  currentHealthMonster,
  isMonsterEngaged,
  isMonsterNew,
  isMonsterStaggered,
  monsterName,
  monsterStatusElement,
} from "@neverquest/state/monster";
import { currentHealth, currentStamina } from "@neverquest/state/reserves";
import {
  essence,
  essenceLoot,
  coins,
  coinsLoot,
  scrap,
  scrapLoot,
} from "@neverquest/state/resources";
import {
  showArmor,
  showAttributes,
  showAttributesButton,
  showBlockChance,
  showCoins,
  showCritical,
  showDefense,
  showDodgeChance,
  showEssence,
  showGameOver,
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
  showWildernessStatus,
} from "@neverquest/state/show";

// (ﾉ☉ヮ⚆)ﾉ ⌒*:･ﾟ✧
export default function useReset() {
  const resetAutoEquip = useResetAtom(autoEquip);
  const resetEssence = useResetAtom(essence);
  const resetEssenceLoot = useResetAtom(essenceLoot);
  const resetAttackRateBonus = useResetAtom(attackRateBonus);
  const resetCharacterLevel = useResetAtom(characterLevel);
  const resetCoins = useResetAtom(coins);
  const resetCoinsLoot = useResetAtom(coinsLoot);
  const resetCrew = useResetAtom(crew);
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
  const resetIsMonsterNew = useResetAtom(isMonsterNew);
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
  const resetShowEssence = useResetAtom(showEssence);
  const resetShowArmor = useResetAtom(showArmor);
  const resetShowAttributes = useResetAtom(showAttributes);
  const resetShowAttributesButton = useResetAtom(showAttributesButton);
  const resetShowBlockChance = useResetAtom(showBlockChance);
  const resetShowCoins = useResetAtom(showCoins);
  const resetShowCritical = useResetAtom(showCritical);
  const resetShowDefense = useResetAtom(showDefense);
  const resetShowDodgeChance = useResetAtom(showDodgeChance);
  const resetShowLoot = useResetAtom(showLoot);
  const resetShowGameOver = useResetAtom(showGameOver);
  const resetShowRecovery = useResetAtom(showRecovery);
  const resetShowScrap = useResetAtom(showScrap);
  const resetShowShield = useResetAtom(showShield);
  const resetShowStamina = useResetAtom(showStamina);
  const resetShowTotalAttackRateSummary = useResetAtom(showTotalAttackRateSummary);
  const resetShowTotalDamageSummary = useResetAtom(showTotalDamageSummary);
  const resetShowTotalProtection = useResetAtom(showTotalProtection);
  const resetShowWeapon = useResetAtom(showWeapon);
  const resetShowWildernessStatus = useResetAtom(showWildernessStatus);
  const resetStamina = useResetAtom(stamina);
  const resetStaminaRegenerationRate = useResetAtom(staminaRegenerationRate);
  const resetStatusElement = useResetAtom(statusElement);
  const initialize = useSetAtom(initialization);

  return () => {
    resetAutoEquip();
    resetEssence();
    resetEssenceLoot();
    resetAttackRateBonus();
    resetCharacterLevel();
    resetCoins();
    resetCoinsLoot();
    resetCrew();
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
    resetIsMonsterNew();
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
    resetShowEssence();
    resetShowArmor();
    resetShowAttributes();
    resetShowAttributesButton();
    resetShowBlockChance();
    resetShowCoins();
    resetShowCritical();
    resetShowDefense();
    resetShowDodgeChance();
    resetShowGameOver();
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
    resetShowWildernessStatus();
    resetStamina();
    resetStaminaRegenerationRate();
    resetStatusElement();

    initialize();
  };
}
