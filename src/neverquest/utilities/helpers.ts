// Animates an element once according to its Animate.css type.
export function animateElement(element: HTMLDivElement | null, animation: string, speed?: string) {
  if (element === null) {
    return;
  }

  const { addEventListener, classList } = element;

  const PREFIX = "animate__";
  const animationClass = `${PREFIX}animated`;
  const animationName = `${PREFIX}${animation}`;
  const animationSpeed = speed ? `${PREFIX}${speed}` : null;

  classList.add(animationClass, animationName);

  if (animationSpeed) {
    classList.add(animationSpeed);
  }

  addEventListener(
    "animationend",
    (event: AnimationEvent) => {
      event.stopPropagation();
      classList.remove(animationClass, animationName);

      if (animationSpeed) {
        classList.remove(animationSpeed);
      }
    },
    { once: true }
  );
}

export function capitalizeAll(string: string) {
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

// Correctly does the rounding as opposed to .toFixed().
export function formatToFixed(number: number, digits = 2) {
  const multiplier = Math.pow(10, digits);
  const result = parseFloat((number * multiplier).toFixed(11));

  return (Math.round(result) / multiplier).toFixed(digits);
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

export function getFromRange({ maximum, minimum }: { maximum: number; minimum: number }) {
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

export function getSellPrice({ price }: { price: number }) {
  return Math.floor(price / 2);
}

// https://en.wikipedia.org/wiki/Triangular_number
export function getTriangularNumber(number: number) {
  return (number * (number + 1)) / 2;
}
