import { useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";

import { attributes } from "@neverquest/state/attributes";
import { crew, exchangeCoin, exchangeScrap, merchantInventory } from "@neverquest/state/caravan";
import {
  characterLevel,
  hasKnapsack,
  isAttacking,
  isLooting,
  isRecovering,
  lootingRate,
  name,
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
import { skills } from "@neverquest/state/skills";

// (ﾉ☉ヮ⚆)ﾉ ⌒*:･ﾟ✧
export default function useReset() {
  const resetAttributes = useResetAtom(attributes);
  const resetAutoEquip = useResetAtom(autoEquip);
  const resetEssence = useResetAtom(essence);
  const resetEssenceLoot = useResetAtom(essenceLoot);
  const resetCharacterLevel = useResetAtom(characterLevel);
  const resetCoins = useResetAtom(coins);
  const resetCoinsLoot = useResetAtom(coinsLoot);
  const resetCrew = useResetAtom(crew);
  const resetCurrentHealth = useResetAtom(currentHealth);
  const resetCurrentHealthMonster = useResetAtom(currentHealthMonster);
  const resetCurrentStamina = useResetAtom(currentStamina);
  const resetExchangeCoin = useResetAtom(exchangeCoin);
  const resetExchangeScrap = useResetAtom(exchangeScrap);
  const resetGameOver = useResetAtom(gameOver);
  const resetHasKnapsack = useResetAtom(hasKnapsack);
  const resetInventory = useResetAtom(inventory);
  const resetEncumbranceMaximum = useResetAtom(encumbranceMaximum);
  const resetIsAttacking = useResetAtom(isAttacking);
  const resetIsLooting = useResetAtom(isLooting);
  const resetIsMonsterEngaged = useResetAtom(isMonsterEngaged);
  const resetIsMonsterNew = useResetAtom(isMonsterNew);
  const resetIsMonsterStaggered = useResetAtom(isMonsterStaggered);
  const resetIsRecovering = useResetAtom(isRecovering);
  const resetLevel = useResetAtom(level);
  const resetLootingRate = useResetAtom(lootingRate);
  const resetMerchantInventory = useResetAtom(merchantInventory);
  const resetMode = useResetAtom(mode);
  const resetMonsterName = useResetAtom(monsterName);
  const resetName = useResetAtom(name);
  const resetProgress = useResetAtom(progress);
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
  const resetSkills = useResetAtom(skills);
  const initialize = useSetAtom(initialization);

  return () => {
    resetAttributes();
    resetAutoEquip();
    resetEssence();
    resetEssenceLoot();
    resetCharacterLevel();
    resetCoins();
    resetCoinsLoot();
    resetCrew();
    resetCurrentHealth();
    resetCurrentHealthMonster();
    resetCurrentStamina();
    resetExchangeCoin();
    resetExchangeScrap();
    resetGameOver();
    resetHasKnapsack();
    resetInventory();
    resetEncumbranceMaximum();
    resetIsAttacking();
    resetIsLooting();
    resetIsMonsterEngaged();
    resetIsMonsterNew();
    resetIsMonsterStaggered();
    resetIsRecovering();
    resetLevel();
    resetLootingRate();
    resetMerchantInventory();
    resetMode();
    resetMonsterName();
    resetName();
    resetProgress();
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
    resetSkills();

    initialize();
  };
}
