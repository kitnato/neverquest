import { selector } from "recoil"

import { ATTRIBUTES } from "@neverquest/data/attributes"
import { GENERIC_MINIMUM, PERCENTAGE_POINTS } from "@neverquest/data/general"
import {
  BLEED,
  DEFLECTION_MAXIMUM,
  PARRY_ABSORPTION,
  PARRY_DAMAGE,
  RECOVERY_RATE,
} from "@neverquest/data/statistics"
import {
  BRAWLER_DAMAGE_BONUS,
  BRUISER,
  INOCULATED_DEFLECTION_BASE,
  NUDIST,
  TANK_PROTECTION_BONUS,
} from "@neverquest/data/traits"
import { bleed, bleedChance, staggerChance, stunChance } from "@neverquest/state/ailments"
import { attributeStatistic } from "@neverquest/state/attributes"
import { armor, elementalEffects, shield, weapon } from "@neverquest/state/gear"
import { infusionEffect } from "@neverquest/state/items"
import { masteryStatistic } from "@neverquest/state/masteries"
import { questsBonus } from "@neverquest/state/quests"
import { stamina } from "@neverquest/state/reserves"
import { isSkillAcquired } from "@neverquest/state/skills"
import { isTraitAcquired } from "@neverquest/state/traits"
import {
  isMelee,
  isRanged,
  isUnarmed,
  isUnarmored,
  isUnshielded,
} from "@neverquest/types/type-guards"
import { getAmountPerTick, getDamagePerRate } from "@neverquest/utilities/getters"
import { withStateKey } from "@neverquest/utilities/helpers"

// SELECTORS

export const attackRate = withStateKey(`attackRate`, (key) =>
  selector({
    get: ({ get }) => get(weapon).rate * (1 + get(attributeStatistic(`speed`))),
    key,
  }),
)

export const bleedDamage = withStateKey(`bleedDamage`, (key) =>
  selector({
    get: ({ get }) => {
      const { duration, ticks } = get(bleed)

      return Math.max(
        BLEED.minimum,
        Math.round(
          getAmountPerTick({
            amount: get(damage) * get(masteryStatistic(`cruelty`)),
            duration,
            ticks,
          }),
        ),
      )
    },
    key,
  }),
)

export const bleedRating = withStateKey(`bleedRating`, (key) =>
  selector({
    get: ({ get }) =>
      Math.round(
        get(masteryStatistic(`cruelty`)) * PERCENTAGE_POINTS + get(bleedChance) * PERCENTAGE_POINTS,
      ),
    key,
  }),
)

export const blockChance = withStateKey(`blockChance`, (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon)

      return !isRanged(weaponValue) &&
        (weaponValue.grip === `one-handed` || get(isTraitAcquired(`colossus`)))
        ? get(shield).block
        : 0
    },
    key,
  }),
)

export const criticalChance = withStateKey(`criticalChance`, (key) =>
  selector({
    get: ({ get }) =>
      get(isSkillAcquired(`assassination`)) ? get(attributeStatistic(`dexterity`)) : 0,
    key,
  }),
)

export const criticalDamage = withStateKey(`criticalDamage`, (key) =>
  selector({
    get: ({ get }) =>
      get(isSkillAcquired(`assassination`)) ? get(attributeStatistic(`perception`)) : 0,
    key,
  }),
)

export const criticalRating = withStateKey(`criticalRating`, (key) =>
  selector({
    get: ({ get }) =>
      Math.round(get(criticalChance) * PERCENTAGE_POINTS + get(criticalDamage) * PERCENTAGE_POINTS),
    key,
  }),
)

export const criticalStrike = withStateKey(`criticalStrike`, (key) =>
  selector({
    get: ({ get }) => Math.round(get(damage) * get(criticalDamage)),
    key,
  }),
)

export const damage = withStateKey(`damage`, (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon)
      const isWeaponUnarmed = isUnarmed(weaponValue)

      return Math.round(
        // Weapon damage multiplied by brawler trait bonus, if applicable.
        (weaponValue.damage *
          (get(isTraitAcquired(`brawler`)) &&
            isUnshielded(get(shield)) &&
            (isMelee(weaponValue) || isWeaponUnarmed) &&
            (weaponValue.grip === `one-handed` || get(isTraitAcquired(`colossus`)))
            ? 1 + BRAWLER_DAMAGE_BONUS
            : 1) +
          // Strength attribute effect.
          get(attributeStatistic(`strength`)) +
          // Elemental damage from any gems.
          Object.values(get(elementalEffects).weapon).reduce((sum, { damage }) => sum + damage, 0) +
          // Current stamina portion from bruiser trait, if applicable.
          (get(isTraitAcquired(`bruiser`)) && isWeaponUnarmed
            ? get(stamina) * BRUISER.damage
            : 0)) *
        // All multiplied by total damage bonus from quest rewards.
        (1 + get(questsBonus(`damageBonus`))),
      )
    },
    key,
  }),
)

export const damagePerSecond = withStateKey(`damagePerSecond`, (key) =>
  selector({
    get: ({ get }) =>
      getDamagePerRate({
        damage: get(damage),
        damageModifier: get(criticalDamage),
        damageModifierChance: get(criticalChance),
        rate: get(attackRate),
      }),
    key,
  }),
)

export const deflectionChance = withStateKey(`deflectionChance`, (key) =>
  selector({
    get: ({ get }) =>
      get(isSkillAcquired(`impermeability`))
        ? Math.min(
          get(armor).deflection +
          (get(isTraitAcquired(`inoculated`)) ? INOCULATED_DEFLECTION_BASE : 0),
          DEFLECTION_MAXIMUM,
        )
        : 0,
    key,
  }),
)

export const dodgeChance = withStateKey(`dodgeChance`, (key) =>
  selector({
    get: ({ get }) =>
      get(isSkillAcquired(`evasion`))
        ? Math.min(
          get(attributeStatistic(`agility`)) *
          (get(isTraitAcquired(`nudist`)) && isUnarmored(get(armor))
            ? 1 + NUDIST.dodgeBonus
            : 1),
          ATTRIBUTES.agility.maximum ?? Number.POSITIVE_INFINITY,
        )
        : 0,
    key,
  }),
)

export const executionThreshold = withStateKey(`executionThreshold`, (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon)

      return get(isSkillAcquired(`siegecraft`)) &&
        isMelee(weaponValue) &&
        weaponValue.grip === `two-handed`
        ? get(masteryStatistic(`butchery`))
        : 0
    },
    key,
  }),
)

export const lifeLeech = withStateKey(`lifeLeech`, (key) =>
  selector({
    get: ({ get }) => {
      const infusionEffectEldritchCodex = get(infusionEffect(`eldritch codex`))

      if (infusionEffectEldritchCodex === 0) {
        return 0
      }

      return Math.max(Math.round(get(damage) * infusionEffectEldritchCodex), GENERIC_MINIMUM)
    },
    key,
  }),
)

export const parryAbsorption = withStateKey(`parryAbsorption`, (key) =>
  selector({
    get: ({ get }) => PARRY_ABSORPTION + get(masteryStatistic(`finesse`)),
    key,
  }),
)

export const parryChance = withStateKey(`parryChance`, (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon)

      return get(isSkillAcquired(`escrime`)) && gearClass === `slashing` ? abilityChance : 0
    },
    key,
  }),
)

export const parryDamage = withStateKey(`parryDamage`, (key) =>
  selector({
    get: ({ get }) => PARRY_DAMAGE + get(masteryStatistic(`finesse`)),
    key,
  }),
)

export const parryRating = withStateKey(`parryRating`, (key) =>
  selector({
    get: ({ get }) =>
      Math.round(
        get(parryChance) * PERCENTAGE_POINTS + get(masteryStatistic(`finesse`)) * PERCENTAGE_POINTS,
      ),
    key,
  }),
)

export const protection = withStateKey(`protection`, (key) =>
  selector({
    get: ({ get }) => {
      const { protection } = get(armor)
      const shieldValue = get(shield)

      return (
        protection +
        (!isUnshielded(shieldValue) && get(isTraitAcquired(`tank`))
          ? Math.max(Math.round(protection * TANK_PROTECTION_BONUS), GENERIC_MINIMUM)
          : 0)
      )
    },
    key,
  }),
)

export const recoveryRate = withStateKey(`recoveryRate`, (key) =>
  selector({
    get: ({ get }) =>
      Math.max(RECOVERY_RATE - RECOVERY_RATE * get(masteryStatistic(`resilience`)), 0),
    key,
  }),
)

export const range = withStateKey(`range`, (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon)

      return get(isSkillAcquired(`archery`)) && isRanged(weaponValue)
        ? weaponValue.range * (1 + get(masteryStatistic(`marksmanship`)))
        : 0
    },
    key,
  }),
)

export const staggerRating = withStateKey(`staggerRating`, (key) =>
  selector({
    get: ({ get }) => Math.round(get(staggerChance) * get(masteryStatistic(`stability`))),
    key,
  }),
)

export const stunRating = withStateKey(`stunRating`, (key) =>
  selector({
    get: ({ get }) => Math.round(get(stunChance) * get(masteryStatistic(`might`))),
    key,
  }),
)

export const thorns = withStateKey(`thorns`, (key) =>
  selector({
    get: ({ get }) =>
      Object.values(get(elementalEffects).armor).reduce((sum, { damage }) => sum + damage, 0),
    key,
  }),
)
