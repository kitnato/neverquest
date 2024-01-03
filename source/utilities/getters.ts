import type {
  AffixStructure,
  ArmorClass,
  ShieldClass,
  WeaponClass,
} from "@kitnato/locran/build/types";
import { nanoid } from "nanoid";
import type { RecoilValue, Snapshot } from "recoil";

import { ATTRIBUTE_COST_BASE } from "@neverquest/data/attributes";
import { AFFIX_STRUCTURE_WEIGHTS, PROGRESS_REDUCTION } from "@neverquest/data/encounter";
import {
  type ARMOR_NONE,
  ARMOR_SPECIFICATIONS,
  type SHIELD_NONE,
  SHIELD_SPECIFICATIONS,
  WEAPON_BASE,
  WEAPON_MODIFIER,
  type WEAPON_NONE,
  WEAPON_SPECIFICATIONS,
} from "@neverquest/data/gear";
import {
  CLASS_ANIMATED,
  CLASS_ANIMATE_PREFIX,
  GROWTH_MAXIMUM,
  MILLISECONDS_IN_SECOND,
  RETIREMENT_STAGE_MINIMUM,
  ROMAN_NUMERALS,
  ROMAN_NUMERAL_MAXIMUM,
} from "@neverquest/data/general";
import {
  ELEMENTALS,
  GEMS,
  GEMS_MAXIMUM,
  GEM_BASE,
  GEM_ENHANCEMENT_RANGE,
  GEM_FITTING_COST_RANGE,
} from "@neverquest/data/items";
import { QUESTS } from "@neverquest/data/quests";
import type {
  Armor,
  GearItem,
  GearItemUnequipped,
  GemItem,
  GeneratorRange,
  InventoryItem,
  QuestData,
  Shield,
  Weapon,
} from "@neverquest/types";
import {
  isArmor,
  isConquest,
  isGearItem,
  isGeneratorRanges,
  isRoutine,
  isWeapon,
} from "@neverquest/types/type-guards";
import type { Animation, AnimationSpeed } from "@neverquest/types/ui";
import type { Elemental, Grip, Quest } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function getAffixStructure(): AffixStructure {
  let chance = Math.random();
  const result = AFFIX_STRUCTURE_WEIGHTS.find(([_, probability]) => (chance -= probability) <= 0);

  return result === undefined ? "none" : result[0];
}

export function getAnimationClass({
  animation,
  isInfinite,
  speed,
}: {
  animation: Animation;
  isInfinite?: boolean;
  speed?: AnimationSpeed;
}) {
  return `${CLASS_ANIMATED} ${CLASS_ANIMATE_PREFIX}${animation}${
    isInfinite ? ` ${CLASS_ANIMATE_PREFIX}infinite` : ""
  }${speed ? ` ${CLASS_ANIMATE_PREFIX}${speed}` : ""}`;
}

export function getArmorRanges({ factor, gearClass }: { factor: number; gearClass: ArmorClass }) {
  const { burden, deflection, protection, weight } = ARMOR_SPECIFICATIONS[gearClass];

  return {
    burden: isGeneratorRanges(burden)
      ? getRange({ factor, isRounded: true, ranges: burden })
      : burden,
    deflection: deflection === undefined ? undefined : getRange({ factor, ranges: deflection }),
    protection: getRange({ factor, isRounded: true, ranges: protection }),
    weight: getRange({ factor, isRounded: true, ranges: weight }),
  };
}

export function getAttributePointCost(powerLevel: number) {
  return getTriangular(ATTRIBUTE_COST_BASE + powerLevel);
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
  return (
    (damage * (1 - damageModifierChance) + damage * damageModifierChance * damageModifier) /
    (rate / MILLISECONDS_IN_SECOND)
  );
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

export function getGearElementalEffects({
  gear,
  gems,
}: {
  gear: Armor | Weapon | typeof ARMOR_NONE | typeof WEAPON_NONE;
  gems: GemItem[];
}): Record<Elemental, { damage: number; duration: number }>;
export function getGearElementalEffects({
  gear,
  gems,
}: {
  gear: Shield | typeof SHIELD_NONE;
  gems: GemItem[];
}): Record<Elemental, number>;
export function getGearElementalEffects({
  gear,
  gems,
}: {
  gear: GearItem | GearItemUnequipped;
  gems: GemItem[];
}): Record<Elemental, { damage: number; duration: number }> | Record<Elemental, number>;
export function getGearElementalEffects({
  gear,
  gems,
}: {
  gear: GearItem | GearItemUnequipped;
  gems: GemItem[];
}) {
  if (isArmor(gear) || isWeapon(gear)) {
    const effects = {
      fire: { damage: 0, duration: 0 },
      ice: { damage: 0, duration: 0 },
      lightning: { damage: 0, duration: 0 },
    };
    const effector = isArmor(gear) ? gear.protection : gear.damage;

    for (const { amount, item } of stackItems(gems)) {
      const { elemental } = GEMS[item.name];
      const { damage, duration } = ELEMENTALS[elemental];

      effects[elemental] = {
        damage: Math.round(
          effector * getFromRange({ factor: (amount - 1) / (GEMS_MAXIMUM - 1), ...damage }),
        ),
        duration: Math.round(
          getFromRange({
            factor: (amount - 1) / (GEMS_MAXIMUM - 1),
            ...duration,
          }),
        ),
      };
    }

    return effects;
  }

  const effects = { fire: 0, ice: 0, lightning: 0 };

  for (const { amount, item } of stackItems(gems)) {
    const { elemental } = GEMS[item.name];

    effects[elemental] = getFromRange({
      factor: (amount - 1) / (GEMS_MAXIMUM - 1),
      ...GEM_ENHANCEMENT_RANGE,
    });
  }

  return effects;
}

export function getFromRange({ factor, maximum, minimum }: GeneratorRange & { factor?: number }) {
  return (factor ?? Math.random()) * (maximum - minimum) + minimum;
}

export function getGemFittingCost(fitted: number) {
  return Math.round(
    getFromRange({ factor: fitted / (GEMS_MAXIMUM - 1), ...GEM_FITTING_COST_RANGE }),
  );
}

export function getLinearMapping({ offset, stage }: { offset: number; stage: number }) {
  return ((stage - offset) * (GROWTH_MAXIMUM - 1)) / (GROWTH_MAXIMUM - offset - 1) + 1;
}

export function getProgressReduction(stage: number) {
  const { maximum, minimum } = PROGRESS_REDUCTION;

  return getFromRange({
    factor: getSigmoid(
      getLinearMapping({
        offset: RETIREMENT_STAGE_MINIMUM,
        stage,
      }),
    ),
    maximum,
    minimum,
  });
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
    burden: burdenModifier,
    damage: damageModifier,
    rate: rateModifier,
    weight: weightModifier,
  } = WEAPON_MODIFIER[grip];
  const { burden, damage, rate, weight } = WEAPON_BASE;
  const { abilityChance } = WEAPON_SPECIFICATIONS[gearClass];

  return {
    abilityChance: getRange({ factor, modifier: abilityModifier, ranges: abilityChance }),
    burden: getRange({ factor, isRounded: true, modifier: burdenModifier, ranges: burden }),
    damage: getRange({ factor, isRounded: true, modifier: damageModifier, ranges: damage }),
    rate: getRange({ factor, isRounded: true, modifier: rateModifier, ranges: rate }),
    weight: getRange({ factor, isRounded: true, modifier: weightModifier, ranges: weight }),
  };
}

export function getQuestsData(quest: Quest): QuestData[] {
  const { description, hidden, progression, title } = QUESTS[quest];

  return progression.map((progress, index) => ({
    description: description.replace("@", formatNumber({ value: progress })),
    hidden,
    progressionIndex: index,
    progressionMaximum: progress,
    questClass: isConquest(quest) ? "conquest" : isRoutine(quest) ? "routine" : "triumph",
    title: `${title}${progression.length > 1 ? ` ${getRomanNumeral(index + 1)}` : ""}`,
  }));
}

export function getRange({
  factor,
  isRounded = false,
  modifier = 1,
  ranges,
}: {
  factor: number;
  isRounded?: boolean;
  modifier?: number;
  ranges: [GeneratorRange, GeneratorRange];
}): GeneratorRange {
  const maximum =
    getFromRange({ factor, maximum: ranges[1].maximum, minimum: ranges[0].maximum }) * modifier;
  const minimum =
    getFromRange({ factor, maximum: ranges[1].minimum, minimum: ranges[0].minimum }) * modifier;

  return {
    maximum: isRounded ? Math.round(maximum) : maximum,
    minimum: isRounded ? Math.round(minimum) : minimum,
  };
}

export function getRangedRanges({ factor, gearClass }: { factor: number; gearClass: WeaponClass }) {
  const {
    ability: abilityModifier,
    burden: burdenModifier,
    damage: damageModifier,
    rate: rateModifier,
    weight: weightModifier,
  } = WEAPON_MODIFIER.ranged;
  const { ammunitionCost, burden, damage, range, rate, weight } = WEAPON_BASE;
  const { abilityChance } = WEAPON_SPECIFICATIONS[gearClass];

  return {
    abilityChance: getRange({ factor, modifier: abilityModifier, ranges: abilityChance }),
    ammunitionCost: getRange({ factor, isRounded: true, ranges: ammunitionCost }),
    burden: getRange({ factor, isRounded: true, modifier: burdenModifier, ranges: burden }),
    damage: getRange({ factor, isRounded: true, modifier: damageModifier, ranges: damage }),
    range: getRange({ factor, isRounded: true, ranges: range }),
    rate: getRange({ factor, isRounded: true, modifier: rateModifier, ranges: rate }),
    weight: getRange({ factor, isRounded: true, modifier: weightModifier, ranges: weight }),
  };
}

function getRomanNumeral(value: number) {
  if (!Number.isInteger(value) || value < 1 || value > ROMAN_NUMERAL_MAXIMUM) {
    return value;
  }

  const digits = [...Math.round(value).toString()];
  let position = digits.length - 1;
  let currentNumeral = "";

  for (const digit of digits) {
    const numeral = ROMAN_NUMERALS[position];

    if (numeral !== undefined && digit !== "0") {
      currentNumeral += numeral[Number.parseInt(digit) - 1];
    }

    position -= 1;
  }

  return currentNumeral;
}

export function getSellPrice({ gemsFitted, item }: { gemsFitted?: number; item: InventoryItem }) {
  const { price } = item;
  let supplement = 0;

  if (isGearItem(item) && gemsFitted !== undefined && gemsFitted > 0) {
    supplement +=
      getSellPrice({
        item: {
          ...GEM_BASE,
          ID: nanoid(),
          name: "ruby",
        },
      }) * gemsFitted;
  }

  return Math.ceil(price / 2) + supplement;
}

export function getShieldRanges({ factor, gearClass }: { factor: number; gearClass: ShieldClass }) {
  const { block, burden, stagger, weight } = SHIELD_SPECIFICATIONS[gearClass];

  return {
    block: getRange({ factor, ranges: block }),
    burden: getRange({ factor, isRounded: true, ranges: burden }),
    stagger: stagger === undefined ? undefined : getRange({ factor, ranges: stagger }),
    weight: getRange({ factor, isRounded: true, ranges: weight }),
  };
}

// https://en.wikipedia.org/wiki/Sigmoid_function
// f(0-1) = ~0, f(38) = ~0.43, f(50) = ~0.78, f(GROWTH_MAXIMUM) = ~1
export function getSigmoid(x: number) {
  return 1 / (1 + Math.pow(Math.E, -0.15 * (x - 45)) - 0.009);
}

export function getSnapshotGetter({ getLoadable }: Snapshot) {
  return <T>(state: RecoilValue<T>) => getLoadable(state).getValue();
}

export function getTotalElementalEffects({
  damage,
  duration,
  modifier,
}: {
  damage: number;
  duration: number;
  modifier: number;
}) {
  return {
    damage: Math.round(damage + damage * modifier),
    duration: Math.round(duration + duration * modifier),
  };
}

// https://en.wikipedia.org/wiki/Triangular_number
export function getTriangular(x: number) {
  return (x * (x + 1)) / 2;
}
