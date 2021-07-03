import { selector } from "recoil";

import {
  aether,
  aetherLoot,
  armor,
  attacking,
  attackSpeedReduction,
  coins,
  coinsLoot,
  damage,
  damageDealt,
  health,
  gameOver,
  level,
  mode,
  progress,
  scrap,
  scrapLoot,
  shield,
  stamina,
  weapon,
} from "state/atoms";

import getDamage from "utilities/getDamage";

export const attackSpeed = selector({
  key: "attackSpeed",
  get: ({ get }) => {
    const attackSpeedReductionValue = get(attackSpeedReduction);
    const weaponValue = get(weapon);

    return weaponValue.speed * (1 + attackSpeedReductionValue.current);
  },
});

export const damagePerHit = selector({
  key: "damagePerHit",
  get: ({ get }) => {
    const damageValue = get(damage);
    const weaponValue = get(weapon);

    return {
      min: weaponValue.damage.min + damageValue.current,
      max: weaponValue.damage.max + damageValue.current,
    };
  },
});

export const attack = selector({
  key: "attack",
  set: ({ get, set }) => {
    const staminaValue = get(stamina);
    const dphValue = get(damagePerHit);
    let newStamina = staminaValue.current - get(weapon).cost;

    if (newStamina >= 0) {
      set(damageDealt, getDamage(dphValue));
    }

    if (newStamina < 0) {
      newStamina = 0;
      set(attacking, false);
    }

    if (newStamina > staminaValue.max) {
      newStamina = staminaValue.max;
    }

    set(stamina, { ...staminaValue, current: newStamina });
  },
});

export const totalArmor = selector({
  key: "totalArmor",
  get: ({ get }) => {
    const armorValue = get(armor);
    const shieldValue = get(shield);

    return armorValue.value + shieldValue.armor;
  },
});

export const defend = selector({
  key: "defend",
  set: ({ get, set }, damageTaken) => {
    const totalArmorValue = get(totalArmor);
    const healthValue = get(health);
    let newHealth = healthValue.current + totalArmorValue - damageTaken;

    if (newHealth <= 0) {
      newHealth = 0;
      set(gameOver, true);
    }

    set(health, { ...healthValue, current: newHealth });
  },
});

export const progressMax = selector({
  key: "progressMax",
  get: ({ get }) => {
    const levelValue = get(level);

    return levelValue + 2;
  },
});

export const levelCompleted = selector({
  key: "levelCompleted",
  get: ({ get }) => {
    const progressValue = get(progress);
    const progressMaxValue = get(progressMax);

    return progressValue === progressMaxValue;
  },
});

export const location = selector({
  key: "location",
  get: ({ get }) => {
    const levelValue = get(level);
    const modeValue = get(mode);
    const generatedLocation = (() => {
      if (modeValue === 0) {
        if (levelValue === 1) {
          return "???";
        }
        // TODO - SLIM
        return "Wilderness";
      }
      return "Caravan";
    })();

    return generatedLocation;
  },
  set: ({ get, set }) => {
    const levelValue = get(level);
    const isWilderness = get(mode) === 0;

    if (isWilderness) {
      set(mode, 1);
    } else {
      set(mode, 0);
      set(level, levelValue + 1);
      set(progress, 0);
    }
  },
});

export const looting = selector({
  key: "looting",
  get: ({ get }) => {
    const aetherLootValue = get(aetherLoot);
    const coinsLootValue = get(coinsLoot);
    const scrapLootValue = get(scrapLoot);

    return !(
      aetherLootValue === null &&
      coinsLootValue === null &&
      scrapLootValue === null
    );
  },
  set: ({ get, set }) => {
    const aetherLootValue = get(aetherLoot);
    const coinsLootValue = get(coinsLoot);
    const scrapLootValue = get(scrapLoot);

    set(aether, (currentAether) => (currentAether || 0) + aetherLootValue);
    set(coins, (currentCoins) => (currentCoins || 0) + coinsLootValue);
    set(scrap, (currentScrap) => (currentScrap || 0) + scrapLootValue);

    set(aetherLoot, null);
    set(coinsLoot, null);
    set(scrapLoot, null);
  },
});
