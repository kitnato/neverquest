import type { RecoilValue, Snapshot } from "recoil";

import { CLASS_ANIMATED, CLASS_ANIMATE_PREFIX } from "@neverquest/constants";
import type { Range } from "@neverquest/types";
import type { AnimationSpeed, AnimationType } from "@neverquest/types/ui";
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

export function getFromRange({ maximum, minimum }: Range) {
  const result = Math.random() * (maximum - minimum) + minimum;

  return Number.isInteger(maximum) && Number.isInteger(minimum) ? Math.round(result) : result;
}

export function getSellPrice({ coinPrice }: { coinPrice: number }) {
  return Math.floor(coinPrice / 2);
}

// https://en.wikipedia.org/wiki/Sigmoid_function
// f(0) = ~0, f(50) = ~0.6, f(100) = ~1
export function getGrowthSigmoid(x: number) {
  return 1 / (1 + 100 * Math.pow(Math.E, -0.1 * x));
}

// https://en.wikipedia.org/wiki/Triangular_number
export function getGrowthTriangular(number: number) {
  return (number * (number + 1)) / 2;
}

export function getSnapshotGetter({ getLoadable }: Snapshot) {
  return <T>(state: RecoilValue<T>) => getLoadable(state).getValue();
}
