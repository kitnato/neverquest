// TODO
// eslint-disable-next-line import/prefer-default-export
export function getFromRange({ min, max }) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
