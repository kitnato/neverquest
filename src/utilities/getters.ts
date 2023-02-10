import { RecoilValue, Snapshot } from "recoil";

import { CLASS_ANIMATED, CLASS_ANIMATE_PREFIX } from "@neverquest/constants";
import { WeaponClass } from "@neverquest/LOCRA/types";
import { DeltaType, MasteryType, SkillType } from "@neverquest/types/enums";
import { RangeProps } from "@neverquest/types/props";
import { AnimationSpeed, AnimationType } from "@neverquest/types/ui";
import { formatToFixed } from "@neverquest/utilities/formatters";

export function getAnimationClass({
  isInfinite,
  speed,
  type,
}: {
  isInfinite?: boolean;
  speed?: AnimationSpeed;
  type: AnimationType;
}) {
  return `${CLASS_ANIMATED} ${CLASS_ANIMATE_PREFIX}${type}${
    isInfinite ? ` ${CLASS_ANIMATE_PREFIX}infinite` : ""
  }${speed ? ` ${CLASS_ANIMATE_PREFIX}${speed}` : ""}`;
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

  return formatToFixed((regular + critical) / (rate / 1000));
}

export function getDamagePerTick({
  damage,
  duration,
  proportion,
  ticks,
}: {
  damage: number;
  duration: number;
  proportion: number;
  ticks: number;
}) {
  return Math.ceil(((damage * proportion) / duration) * (duration / ticks));
}

export function getDeltaTypeFromMasteryType(type: MasteryType) {
  switch (type) {
    case MasteryType.BleedDamage: {
      return DeltaType.MasteryBleed;
    }
    case MasteryType.FreeBlockChance: {
      return DeltaType.ChanceFreeBlock;
    }
    case MasteryType.ParryFactor: {
      return DeltaType.MasteryParry;
    }
    case MasteryType.SkipRecoveryChance: {
      return DeltaType.ChanceSkipRecovery;
    }
    case MasteryType.StaggerDuration: {
      return DeltaType.MasteryStagger;
    }
  }
}

export function getFromRange({ maximum, minimum }: RangeProps) {
  const result = Math.random() * (maximum - minimum) + minimum;

  return Number.isInteger(maximum) && Number.isInteger(minimum) ? Math.round(result) : result;
}

export function getSellPrice({ price }: { price: number }) {
  return Math.floor(price / 2);
}

export function getSnapshotGetter({ getLoadable }: Snapshot) {
  return <T>(state: RecoilValue<T>) => getLoadable(state).getValue();
}

// https://en.wikipedia.org/wiki/Triangular_number
export function getTriangularNumber(number: number) {
  return (number * (number + 1)) / 2;
}

export function getSkillTypeFromWeaponClass(type: WeaponClass) {
  switch (type) {
    case WeaponClass.Blunt: {
      return SkillType.Stagger;
    }
    case WeaponClass.Piercing: {
      return SkillType.Bleed;
    }
    case WeaponClass.Slashing: {
      return SkillType.Parry;
    }
  }
}
