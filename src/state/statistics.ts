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
import { attributeStatistic, level } from "@neverquest/state/attributes";
import { armor, ownedItem, shield, weapon } from "@neverquest/state/items";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import type { Attribute } from "@neverquest/types/unions";
import {
  getDamagePerRate,
  getDamagePerTick,
  getElementalEffects,
} from "@neverquest/utilities/getters";
import { stackItems } from "@neverquest/utilities/helpers";

// SELECTORS

export const attackRate = withStateKey("attackRate", (key) =>
  selector({
    get: ({ get }) => get(attributeStatistic("speed")) * get(powerBonus("speed")),
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
    get: ({ get }) => get(attributeStatistic("dexterity")) * (1 + get(powerBonus("dexterity"))),
    key,
  }),
);

export const criticalDamage = withStateKey("criticalDamage", (key) =>
  selector({
    get: ({ get }) => get(attributeStatistic("perception")) * (1 + get(powerBonus("perception"))),
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
    get: ({ get }) => get(attributeStatistic("strength")) * (1 + get(powerBonus("strength"))),
    key,
  }),
);

export const damageTotal = withStateKey("damageTotal", (key) =>
  selector({
    get: ({ get }) =>
      get(damage) +
      get(weapon).damage +
      Object.values(get(totalElementalEffects).weapon).reduce(
        (aggregator, { damage }) => aggregator + damage,
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
    get: ({ get }) =>
      get(armor).staminaCost === Infinity
        ? 0
        : get(attributeStatistic("agility")) * (1 + get(powerBonus("agility"))),
    key,
  }),
);

export const execution = withStateKey("execution", (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon);

      return isMelee(weaponValue) && weaponValue.grip === "two-handed"
        ? get(masteryStatistic("butchery"))
        : 0;
    },
    key,
  }),
);

export const elementalEffects = withStateKey("elementalEffects", (key) =>
  selector({
    get: ({ get }) => {
      const effects = {
        armor: {
          fire: { damage: 0, duration: 0 },
          ice: { damage: 0, duration: 0 },
          lightning: { damage: 0, duration: 0 },
        },
        shield: {
          fire: 0,
          ice: 0,
          lightning: 0,
        },
        weapon: {
          fire: { damage: 0, duration: 0 },
          ice: { damage: 0, duration: 0 },
          lightning: { damage: 0, duration: 0 },
        },
      };

      const armorValue = get(armor);

      stackItems(armorValue.gems).forEach(
        ({ item, stack }) =>
          (effects.armor[GEM_ELEMENTALS[item.type]] = {
            damage: Math.ceil(armorValue.protection * (GEM_DAMAGE[stack - 1] ?? 0)),
            duration: GEM_DURATION[stack - 1] ?? 0,
          }),
      );

      stackItems(get(shield).gems).forEach(
        ({ item, stack }) =>
          (effects.shield[GEM_ELEMENTALS[item.type]] = GEM_ENHANCEMENT[stack - 1] ?? 0),
      );

      const weaponValue = get(weapon);

      stackItems(weaponValue.gems).forEach(
        ({ item, stack }) =>
          (effects.weapon[GEM_ELEMENTALS[item.type]] = {
            damage: Math.ceil(weaponValue.damage * (GEM_DAMAGE[stack - 1] ?? 0)),
            duration: GEM_DURATION[stack - 1] ?? 0,
          }),
      );

      return effects;
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

export const parry = withStateKey("parry", (key) =>
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
    get: ({ get }) => Math.round(get(parry) * get(parryAbsorption) * get(parryDamage) * 1000),
    key,
  }),
);

export const powerBonus = withStateKey("powerBonus", (key) =>
  selectorFamily<number, Attribute>({
    get:
      (parameter) =>
      ({ get }) =>
        get(ownedItem("tome of power")) !== null
          ? get(level) * ATTRIBUTES[parameter].powerBonus
          : 0,
    key,
  }),
);

export const protection = withStateKey("protection", (key) =>
  selector({
    get: ({ get }) => get(armor).protection,
    key,
  }),
);

export const range = withStateKey("range", (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon);

      return isRanged(weaponValue)
        ? weaponValue.range * (1 + get(masteryStatistic("marksmanship")))
        : 0;
    },
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
    get: ({ get }) =>
      Math.round(get(attributeStatistic("fortitude")) * (1 + get(powerBonus("fortitude")))),
    key,
  }),
);

export const reserveRegenerationRate = withStateKey("reserveRegenerationRate", (key) =>
  selector({
    get: ({ get }) => get(attributeStatistic("vigor")) * (1 + get(powerBonus("vigor"))),
    key,
  }),
);

export const staggerRating = withStateKey("staggerRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(shield).stagger * get(masteryStatistic("stability"))),
    key,
  }),
);

export const stunRating = withStateKey("stunRating", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return gearClass === "blunt"
        ? Math.round(abilityChance * get(masteryStatistic("might")) * 100)
        : 0;
    },
    key,
  }),
);

export const thorns = withStateKey("thorns", (key) =>
  selector({
    get: ({ get }) =>
      Object.values(get(elementalEffects).armor).reduce(
        (aggregator, { damage }) => aggregator + damage,
        0,
      ),
    key,
  }),
);

export const totalElementalEffects = withStateKey("totalElementalEffects", (key) =>
  selector({
    get: ({ get }) => {
      const { armor, shield, weapon } = get(elementalEffects);

      return {
        armor: {
          fire: getElementalEffects({ base: armor.fire, modifier: shield.fire }),
          ice: getElementalEffects({ base: armor.ice, modifier: shield.ice }),
          lightning: getElementalEffects({ base: armor.lightning, modifier: shield.lightning }),
        },
        weapon: {
          fire: getElementalEffects({ base: weapon.fire, modifier: shield.fire }),
          ice: getElementalEffects({ base: weapon.ice, modifier: shield.ice }),
          lightning: getElementalEffects({ base: weapon.lightning, modifier: shield.lightning }),
        },
      };
    },
    key,
  }),
);
