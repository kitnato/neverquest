import { ANIMATED_CLASS, ANIMATE_PREFIX } from "@neverquest/constants";
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

  const { addEventListener, classList } = element;
  const animationName = `${ANIMATE_PREFIX}${type}`;
  const animationSpeedClass = speed ? `${ANIMATE_PREFIX}${speed}` : null;

  if (classList.contains("d-none")) {
    classList.remove("d-none");
  }

  classList.add(ANIMATED_CLASS, animationName);

  if (animationSpeedClass) {
    classList.add(animationSpeedClass);
  }

  addEventListener(
    "animationend",
    (event: AnimationEvent) => {
      event.stopPropagation();
      classList.remove(ANIMATED_CLASS, animationName);

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
  return `${ANIMATED_CLASS} ${ANIMATE_PREFIX}${type}${
    isInfinite ? ` ${ANIMATE_PREFIX}infinite` : ""
  }${speed ? ` ${ANIMATE_PREFIX}${speed}` : ""}`;
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

export function getDamagePerSecond({ damage, rate }: { damage: number; rate: number }) {
  return formatToFixed(damage / 2 / (rate / 1000));
}

export function getFromRange({ maximum, minimum }: RangeProps) {
  const result = Math.random() * (maximum - minimum) + minimum;

  return Number.isInteger(maximum) && Number.isInteger(minimum) ? Math.round(result) : result;
}

export function getSellPrice({ price }: { price: number }) {
  return Math.floor(price / 2);
}

// https://en.wikipedia.org/wiki/Triangular_number
export function getTriangularNumber(number: number) {
  return (number * (number + 1)) / 2;
}

export function getWeaponSpecifications(level: number) {
  return {
    damage: getFromRange({ maximum: level + Math.floor(level / 3), minimum: level }),
    price: level * 2 + Math.floor(level / 2),
    rate: getFromRange({ maximum: 3500, minimum: 3000 }) - Math.floor(level / 2) * 50,
    staminaCost: 1 + Math.floor(level / 3),
    weight: 1 + Math.floor(level / 4),
  };
}
