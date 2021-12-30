// https://en.wikipedia.org/wiki/Triangular_number
export function getAttributeCost(points) {
  return (points * (points + 1)) / 2;
}

export function getFromRange({ max, min }) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
