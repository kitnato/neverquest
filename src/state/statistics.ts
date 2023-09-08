import { selector, selectorFamily } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import {
  GEM_DAMAGE,
  GEM_DURATION,
  GEM_ELEMENTALS,
  GEM_ENHANCEMENT,
} from "@neverquest/data/inventory";
import { BLEED, PARRY_ABSORPTION, PARRY_DAMAGE, RECOVERY_RATE } from "@neverquest/data/statistics";
import { withStateKey } from "@neverquest/state";
import { level, rawAttributeStatistic } from "@neverquest/state/attributes";
import { armor, hasItem, shield, weapon } from "@neverquest/state/inventory";
import { masteryStatistic } from "@neverquest/state/masteries";
import type { ElementalGearEffects } from "@neverquest/types";
import type { Attribute, ElementalGear } from "@neverquest/types/unions";
import { getDamagePerRate, getDamagePerTick } from "@neverquest/utilities/getters";
import { stackItems } from "@neverquest/utilities/helpers";

// SELECTORS

export const attackRate = withStateKey("attackRate", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("speed"));

      return total + total * get(powerBonus("speed"));
    },
    key,
  }),
);

export const attackRateTotal = withStateKey("attackRateTotal", (key) =>
  selector({
    get: ({ get }) => get(weapon).rate * (1 - get(attackRate)),
    key,
  }),
);

export const bleed = withStateKey("bleed", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return gearClass === "piercing" ? abilityChance : 0;
    },
    key,
  }),
);

export const bleedDamage = withStateKey("bleedDamage", (key) =>
  selector({
    get: ({ get }) => {
      const { duration, ticks } = BLEED;

      return Math.round(
        getDamagePerTick({
          damage: Math.round(get(damageTotal)) * get(masteryStatistic("cruelty")),
          duration,
          ticks,
        }),
      );
    },
    key,
  }),
);

export const bleedRating = withStateKey("bleedRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(bleedDamage) * get(bleed) * 100),
    key,
  }),
);

export const block = withStateKey("block", (key) =>
  selector({
    get: ({ get }) => get(shield).block,
    key,
  }),
);

export const criticalChance = withStateKey("criticalChance", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("dexterity"));

      return total + total * get(powerBonus("dexterity"));
    },
    key,
  }),
);

export const criticalDamage = withStateKey("criticalDamage", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("perception"));

      return total + total * get(powerBonus("perception"));
    },
    key,
  }),
);

export const criticalRating = withStateKey("criticalRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(criticalChance) * get(criticalDamage) * 1000),
    key,
  }),
);

export const criticalStrike = withStateKey("criticalStrike", (key) =>
  selector({
    get: ({ get }) => Math.round(get(damageTotal) * get(criticalDamage)),
    key,
  }),
);

export const damage = withStateKey("damage", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("strength"));

      return Math.round(total + total * get(powerBonus("strength")));
    },
    key,
  }),
);

export const damageTotal = withStateKey("damageTotal", (key) =>
  selector({
    get: ({ get }) =>
      get(damage) +
      get(weapon).damage +
      Object.values(get(totalElementalEffects("weapon"))).reduce(
        (current, { damage }) => current + damage,
        0,
      ),
    key,
  }),
);

export const damagePerSecond = withStateKey("damagePerSecond", (key) =>
  selector({
    get: ({ get }) =>
      getDamagePerRate({
        damage: get(damageTotal),
        damageModifier: get(criticalDamage),
        damageModifierChance: get(criticalChance),
        rate: get(attackRateTotal),
      }),
    key,
  }),
);

export const deflection = withStateKey("deflection", (key) =>
  selector({
    get: ({ get }) => get(armor).deflection,
    key,
  }),
);

export const dodge = withStateKey("dodge", (key) =>
  selector({
    get: ({ get }) => {
      const { staminaCost } = get(armor);
      const total = get(rawAttributeStatistic("agility"));

      if (staminaCost === Infinity) {
        return 0;
      }

      return total + total * get(powerBonus("agility"));
    },
    key,
  }),
);

export const gearElementalEffects = withStateKey("gearElementalEffects", (key) =>
  selectorFamily<ElementalGearEffects, ElementalGear>({
    get:
      (parameter) =>
      ({ get }) => {
        const { damage, gems } =
          parameter === "armor" ? { ...get(armor), damage: get(armor).protection } : get(weapon);

        return stackItems(gems).reduce(
          (current, { item, stack }) => ({
            ...current,
            [GEM_ELEMENTALS[item.type]]: {
              damage: Math.ceil(damage * (GEM_DAMAGE[stack - 1] ?? 0)),
              duration: GEM_DURATION[stack - 1] ?? 0,
            },
          }),
          {
            fire: { damage: 0, duration: 0 },
            ice: { damage: 0, duration: 0 },
            lightning: { damage: 0, duration: 0 },
          },
        );
      },
    key,
  }),
);

export const lootBonus = withStateKey("lootBonus", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("luck"));

      return get(hasItem("antique coin")) ? total + total * get(powerBonus("luck")) : 0;
    },
    key,
  }),
);

export const parryAbsorption = withStateKey("parryAbsorption", (key) =>
  selector({
    get: ({ get }) => PARRY_ABSORPTION + get(masteryStatistic("finesse")),
    key,
  }),
);

export const parryChance = withStateKey("parryChance", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return gearClass === "slashing" ? abilityChance : 0;
    },
    key,
  }),
);

export const parryDamage = withStateKey("parryDamage", (key) =>
  selector({
    get: ({ get }) => PARRY_DAMAGE + get(masteryStatistic("finesse")),
    key,
  }),
);

export const parryRating = withStateKey("parryRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(parryChance) * get(parryAbsorption) * get(parryDamage) * 1000),
    key,
  }),
);

export const powerBonus = withStateKey("powerBonus", (key) =>
  selectorFamily<number, Attribute>({
    get:
      (parameter) =>
      ({ get }) =>
        get(hasItem("tome of power")) ? get(level) * ATTRIBUTES[parameter].powerBonus : 0,
    key,
  }),
);

export const protection = withStateKey("protection", (key) =>
  selector({
    get: ({ get }) => get(armor).protection,
    key,
  }),
);

export const recoveryRate = withStateKey("recoveryRate", (key) =>
  selector({
    get: ({ get }) => RECOVERY_RATE - RECOVERY_RATE * get(masteryStatistic("resilience")),
    key,
  }),
);

export const reserveRegenerationAmount = withStateKey("reserveRegenerationAmount", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("fortitude"));

      return Math.round(total + total * get(powerBonus("fortitude")));
    },
    key,
  }),
);

export const reserveRegenerationRate = withStateKey("reserveRegenerationRate", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("vigor"));

      return total + total * get(powerBonus("vigor"));
    },
    key,
  }),
);

export const shieldElementalEffects = withStateKey("shieldElementalEffects", (key) =>
  selector({
    get: ({ get }) => {
      const { gems } = get(shield);

      return stackItems(gems).reduce(
        (current, { item, stack }) => ({
          ...current,
          [GEM_ELEMENTALS[item.type]]: GEM_ENHANCEMENT[stack - 1] ?? 0,
        }),
        {
          fire: 0,
          ice: 0,
          lightning: 0,
        },
      );
    },
    key,
  }),
);

export const staggerRating = withStateKey("staggerRating", (key) =>
  selector({
    get: ({ get }) => {
      const mightValue = get(masteryStatistic("might"));

      return Math.round(get(shield).stagger * mightValue + get(staggerWeapon) * mightValue);
    },
    key,
  }),
);

export const staggerWeapon = withStateKey("staggerWeapon", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return gearClass === "blunt" ? abilityChance : 0;
    },
    key,
  }),
);

export const thorns = withStateKey("thorns", (key) =>
  selector({
    get: ({ get }) =>
      Object.values(get(gearElementalEffects("armor"))).reduce(
        (current, { damage }) => current + damage,
        0,
      ),
    key,
  }),
);

export const totalElementalEffects = withStateKey("totalElementalEffects", (key) =>
  selectorFamily<ElementalGearEffects, ElementalGear>({
    get:
      (parameter) =>
      ({ get }) => {
        const { fire, ice, lightning } = get(gearElementalEffects(parameter));
        const {
          fire: fireEnhancement,
          ice: iceEnhancement,
          lightning: lightningEnhancement,
        } = get(shieldElementalEffects);

        return {
          fire: {
            damage: Math.round(fire.damage + fire.damage * fireEnhancement),
            duration: Math.round(fire.duration + fire.duration * fireEnhancement),
          },
          ice: {
            damage: Math.round(ice.damage + ice.damage * iceEnhancement),
            duration: Math.round(ice.duration + ice.duration * iceEnhancement),
          },
          lightning: {
            damage: Math.round(lightning.damage + lightning.damage * lightningEnhancement),
            duration: Math.round(lightning.duration + lightning.duration * lightningEnhancement),
          },
        };
      },
    key,
  }),
);
