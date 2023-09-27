import type { RecoilValue, Snapshot } from "recoil";

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
import { CLASS_ANIMATED, CLASS_ANIMATE_PREFIX } from "@neverquest/utilities/constants";

export function getAnimationClass({
  isInfinite,
  speed,
  type,
}: {
  isInfinite?: boolean;
  speed?: AnimationSpeed;
  type: Animation;
}) {
  return `${CLASS_ANIMATED} ${CLASS_ANIMATE_PREFIX}${type}${
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

export function getFromRange({ maximum, minimum }: GeneratorRange) {
  const result = Math.random() * (maximum - minimum) + minimum;

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

// https://en.wikipedia.org/wiki/Sigmoid_function
// f(0) = ~0, f(50) = ~0.78, f(100) = ~1
export function getGrowthSigmoid(x: number) {
  return 1 / (1 + 300 * Math.pow(Math.E, -0.11 * x));
}

// https://en.wikipedia.org/wiki/Triangular_number
export function getGrowthTriangular(x: number) {
  return (x * (x + 1)) / 2;
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
    (ranges[0].maximum + (ranges[1].maximum - ranges[0].maximum) * factor) * modifier;
  const minimumResult =
    (ranges[0].minimum + (ranges[1].minimum - ranges[0].minimum) * factor) * modifier;

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
