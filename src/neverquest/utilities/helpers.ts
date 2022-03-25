export function capitalizeAll(string: string) {
  // ^ matches the beginning of the string.
  // \w matches any word character.
  // {1} takes only the first character.
  // Thus, ^\w{1} matches the first letter of the word.
  // | works like the boolean OR. It matches the expression after and before the |.
  // \s+ matches any amount of whitespace between the words (for example spaces, tabs, or line breaks)
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

export function getDamagePerSecond({
  range: { maximum, minimum },
  rate,
}: {
  range: { maximum: number; minimum: number };
  rate: number;
}) {
  return ((maximum + minimum) / 2 / (rate / 1000)).toFixed(2);
}

// https://en.wikipedia.org/wiki/Triangular_number
export function getTriangularNumber(number: number) {
  return (number * (number + 1)) / 2;
}

export function getFromRange({ maximum, minimum }: { maximum: number; minimum: number }) {
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}
