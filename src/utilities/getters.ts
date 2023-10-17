import type { RecoilValue, Snapshot } from "recoil";

import { ATTRIBUTE_COST_BASE } from "@neverquest/data/attributes";
import { PROGRESS_REDUCTION } from "@neverquest/data/encounter";
import {
  CLASS_ANIMATED,
  CLASS_ANIMATE_PREFIX,
  GROWTH_MAXIMUM,
  RETIREMENT_MINIMUM,
} from "@neverquest/data/general";
import {
  ARMOR_SPECIFICATIONS,
  SHIELD_SPECIFICATIONS,
  WEAPON_BASE,
  WEAPON_MODIFIER,
  WEAPON_SPECIFICATIONS,
} from "@neverquest/data/inventory";
import type { ArmorClass, ShieldClass, WeaponClass } from "@neverquest/LOCRAN/types";
import type { GeneratorRange } from "@neverquest/types";
import { isGeneratorRanges } from "@neverquest/types/type-guards";
import type { Animation, AnimationSpeed } from "@neverquest/types/ui";
import type { Grip } from "@neverquest/types/unions";

export function getAnimationClass({
  isInfinite,
  name,
  speed,
}: {
  isInfinite?: boolean;
  name: Animation;
  speed?: AnimationSpeed;
}) {
  return `${CLASS_ANIMATED} ${CLASS_ANIMATE_PREFIX}${name}${
    isInfinite ? ` ${CLASS_ANIMATE_PREFIX}infinite` : ""
  }${speed ? ` ${CLASS_ANIMATE_PREFIX}${speed}` : ""}`;
}

export function getArmorRanges({ factor, gearClass }: { factor: number; gearClass: ArmorClass }) {
  const { deflection, protection, staminaCost, weight } = ARMOR_SPECIFICATIONS[gearClass];

  return {
    deflection: deflection === null ? null : getRange({ factor, ranges: deflection }),
    protection: getRange({ factor, ranges: protection }),
    staminaCost: isGeneratorRanges(staminaCost)
      ? getRange({ factor, ranges: staminaCost })
      : staminaCost,
    weight: getRange({ factor, ranges: weight }),
  };
}

export function getAttributePointCost(level: number) {
  return getGrowthTriangular(ATTRIBUTE_COST_BASE + level);
}

export function getComputedStatistic({
  amount,
  base,
  increment,
}: {
  amount: number;
  base: number;
  increment: number;
}) {
  return base + increment * amount;
}

export function getDamagePerRate({
  damage,
  damageModifier = 0,
  damageModifierChance = 0,
  rate,
}: {
  damage: number;
  damageModifier?: number;
  damageModifierChance?: number;
  rate: number;
}) {
  const regular = damage * (1 - damageModifierChance);
  const critical = damage * damageModifierChance * damageModifier;

  return (regular + critical) / (rate / 1000);
}

export function getDamagePerTick({
  damage,
  duration,
  ticks,
}: {
  damage: number;
  duration: number;
  ticks: number;
}) {
  return Math.ceil((damage / duration) * (duration / ticks));
}

export function getElementalEffects({
  base,
  modifier,
}: {
  base: { damage: number; duration: number };
  modifier: number;
}) {
  return {
    damage: Math.round(base.damage + base.damage * modifier),
    duration: Math.round(base.duration + base.duration * modifier),
  };
}

export function getFromRange({ factor, maximum, minimum }: GeneratorRange & { factor?: number }) {
  const result = (factor ?? Math.random()) * (maximum - minimum) + minimum;

  return Number.isInteger(minimum) && Number.isInteger(maximum) ? Math.round(result) : result;
}

export function getGearPrice({
  factor,
  modifier = 1,
  price,
}: {
  factor: number;
  modifier?: number;
  price: GeneratorRange;
}) {
  return Math.round((price.minimum + price.maximum * factor) * modifier);
}

export function getGrowthLinearMapping({ offset, stage }: { offset: number; stage: number }) {
  return ((stage - offset) * (GROWTH_MAXIMUM - 1)) / (GROWTH_MAXIMUM - offset - 1) + 1;
}

// https://en.wikipedia.org/wiki/Sigmoid_function
// f(1) = 0, f(50) = ~0.6, f(100) = ~1
export function getGrowthSigmoid(x: number) {
  return 1 / (1 + Math.pow(Math.E, -0.13 * (x - 47))) - 0.0026 * Math.pow(Math.E, -0.08 * x);
}

// https://en.wikipedia.org/wiki/Triangular_number
export function getGrowthTriangular(x: number) {
  return (x * (x + 1)) / 2;
}

export function getProgressReduction(stage: number) {
  const { maximum, minimum } = PROGRESS_REDUCTION;

  return getFromRange({
    factor: getGrowthSigmoid(
      getGrowthLinearMapping({
        offset: RETIREMENT_MINIMUM,
        stage: stage,
      }),
    ),
    maximum,
    minimum,
  });
}

export function getRange({
  factor,
  modifier = 1,
  ranges,
}: {
  factor: number;
  modifier?: number;
  ranges: [GeneratorRange, GeneratorRange];
}): GeneratorRange {
  const maximumResult =
    getFromRange({ factor, maximum: ranges[1].maximum, minimum: ranges[0].maximum }) * modifier;
  const minimumResult =
    getFromRange({ factor, maximum: ranges[1].minimum, minimum: ranges[0].minimum }) * modifier;

  return {
    maximum:
      Number.isInteger(ranges[0].maximum) && Number.isInteger(ranges[1].maximum)
        ? Math.round(maximumResult)
        : maximumResult,
    minimum:
      Number.isInteger(ranges[0].minimum) && Number.isInteger(ranges[1].minimum)
        ? Math.round(minimumResult)
        : minimumResult,
  };
}

export function getSellPrice({ price }: { price: number }) {
  return Math.ceil(price / 2);
}

export function getShieldRanges({ factor, gearClass }: { factor: number; gearClass: ShieldClass }) {
  const { block, stagger, staminaCost, weight } = SHIELD_SPECIFICATIONS[gearClass];

  return {
    block: getRange({ factor, ranges: block }),
    stagger: stagger === null ? null : getRange({ factor, ranges: stagger }),
    staminaCost: getRange({ factor, ranges: staminaCost }),
    weight: getRange({ factor, ranges: weight }),
  };
}

export function getSnapshotGetter({ getLoadable }: Snapshot) {
  return <T>(state: RecoilValue<T>) => getLoadable(state).getValue();
}

export function getMeleeRanges({
  factor,
  gearClass,
  grip,
}: {
  factor: number;
  gearClass: WeaponClass;
  grip: Grip;
}) {
  const {
    ability: abilityModifier,
    damage: damageModifier,
    rate: rateModifier,
    stamina: staminaModifier,
    weight: weightModifier,
  } = WEAPON_MODIFIER[grip];
  const { damage, rate, staminaCost, weight } = WEAPON_BASE;
  const { abilityChance } = WEAPON_SPECIFICATIONS[gearClass];

  return {
    abilityChance: getRange({ factor, modifier: abilityModifier, ranges: abilityChance }),
    damage: getRange({ factor, modifier: damageModifier, ranges: damage }),
    rate: getRange({ factor, modifier: rateModifier, ranges: rate }),
    staminaCost: getRange({ factor, modifier: staminaModifier, ranges: staminaCost }),
    weight: getRange({ factor, modifier: weightModifier, ranges: weight }),
  };
}

export function getRangedRanges({ factor, gearClass }: { factor: number; gearClass: WeaponClass }) {
  const {
    ability: abilityModifier,
    damage: damageModifier,
    rate: rateModifier,
    stamina: staminaModifier,
    weight: weightModifier,
  } = WEAPON_MODIFIER.ranged;
  const { ammunitionCost, damage, range, rate, staminaCost, weight } = WEAPON_BASE;
  const { abilityChance } = WEAPON_SPECIFICATIONS[gearClass];

  return {
    abilityChance: getRange({ factor, modifier: abilityModifier, ranges: abilityChance }),
    ammunitionCost: getRange({ factor, ranges: ammunitionCost }),
    damage: getRange({ factor, modifier: damageModifier, ranges: damage }),
    range: getRange({ factor, ranges: range }),
    rate: getRange({ factor, modifier: rateModifier, ranges: rate }),
    staminaCost: getRange({ factor, modifier: staminaModifier, ranges: staminaCost }),
    weight: getRange({ factor, modifier: weightModifier, ranges: weight }),
  };
}
