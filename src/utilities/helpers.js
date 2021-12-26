/* eslint-disable import/prefer-default-export */

export function getFromRange({ max, min }) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
