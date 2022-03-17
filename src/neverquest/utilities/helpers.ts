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
