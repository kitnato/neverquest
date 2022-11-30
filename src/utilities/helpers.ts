import { RecoilValue, Snapshot } from "recoil";
import { CLASS_ANIMATED, CLASS_ANIMATE_PREFIX } from "@neverquest/constants";
import {
  ITEM_COMPASS,
  ITEM_HEARTHSTONE,
  ITEM_KNAPSACK,
  ITEM_LODESTONE,
} from "@neverquest/constants/items";
import { Item } from "@neverquest/types";
import { RangeProps } from "@neverquest/types/props";
import { AnimationSpeed, AnimationType } from "@neverquest/types/ui";

export function animateElement({
  element,
  speed,
  type,
}: {
  element: HTMLElement | null;
  speed?: AnimationSpeed;
  type: AnimationType;
}) {
  if (element === null) {
    return;
  }

  const { classList } = element;
  const animationName = `${CLASS_ANIMATE_PREFIX}${type}`;
  const animationSpeedClass = speed ? `${CLASS_ANIMATE_PREFIX}${speed}` : null;

  if (classList.contains("d-none")) {
    classList.remove("d-none");
  }

  classList.add(CLASS_ANIMATED, animationName);

  if (animationSpeedClass) {
    classList.add(animationSpeedClass);
  }

  element.addEventListener(
    "animationend",
    (event: AnimationEvent) => {
      event.stopPropagation();
      classList.remove(CLASS_ANIMATED, animationName);

      if (animationSpeedClass) {
        classList.remove(animationSpeedClass);
      }
    },
    { once: true }
  );
}

export function capitalizeAll(string: null | string | undefined) {
  if (!string) {
    return "";
  }
  // ^ matches the beginning of the string.
  // \w matches any word character.
  // {1} takes only the first character.
  // Thus, ^\w{1} matches the first letter of the word.
  // | works like the boolean OR. It matches the expression after and before the |.
  // \s+ matches any amount of whitespace between the words (for example spaces, tabs, or line breaks)
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

export function formatMilliseconds(ms: number) {
  if (ms <= 0 || Number.isNaN(ms)) {
    return "--";
  }

  let seconds = ms / 1000;
  let minutes = Math.floor(seconds / 60);
  let hours = 0;
  let hoursDisplay = "";
  let minutesDisplay = "";

  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hoursDisplay = hours >= 10 ? `${hours}` : `0${hours}`;
    minutes -= hours * 60;
    minutesDisplay = minutes >= 10 ? `${minutes}` : `0${minutes}`;
  }

  seconds = Math.floor(seconds % 60);
  const secondsDisplay = seconds >= 10 ? seconds : `0${seconds}`;

  if (hours > 0) {
    return `${hoursDisplay}h${minutesDisplay}m${secondsDisplay}s`;
  }
  if (minutes > 0) {
    return `${minutesDisplay}m${secondsDisplay}s`;
  }
  if (seconds > 10) {
    return `${secondsDisplay}s`;
  }

  return `${formatToFixed(ms / 1000)}s`;
}

export function formatPercentage(number: number) {
  return `${formatToFixed(number * 100)}%`;
}

// Correctly does the rounding as opposed to .toFixed().
export function formatToFixed(number: number, decimals = 2) {
  const multiplier = 10 ** decimals;
  const result = parseFloat((number * multiplier).toFixed(11));

  return (Math.round(result) / multiplier).toFixed(decimals);
}

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

export function getComputedStat({
  base,
  increment,
  points,
}: {
  base: number;
  increment: number;
  points: number;
}) {
  return base + increment * points;
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

export function getFromRange({ maximum, minimum }: RangeProps) {
  const result = Math.random() * (maximum - minimum) + minimum;

  return Number.isInteger(maximum) && Number.isInteger(minimum) ? Math.round(result) : result;
}

export function getItemFunctionComponents(item: Item) {
  switch (item.name) {
    case ITEM_COMPASS.name: {
      return { ...ITEM_COMPASS };
    }
    case ITEM_HEARTHSTONE.name: {
      return { ...ITEM_HEARTHSTONE };
    }
    case ITEM_LODESTONE.name: {
      return { ...ITEM_LODESTONE };
    }
    case ITEM_KNAPSACK.name: {
      return { ...ITEM_KNAPSACK };
    }
    default: {
      return { ...item };
    }
  }
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

export function getWeaponSpecifications(level: number) {
  return {
    damage: getFromRange({
      maximum: level + Math.ceil(level / 3),
      minimum: level + 1,
    }),
    modifier: 1 + level / 100,
    price: level * 2 + Math.floor(level / 2),
    rate: getFromRange({ maximum: 3000, minimum: 2500 }) - Math.floor(level / 2) * 50,
    staminaCost: 1 + Math.floor(level / 3),
    weight: 1 + Math.floor(level / 4),
  };
}
