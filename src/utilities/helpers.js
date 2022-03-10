import SLIM from "slim";
import { WEAPON_TYPE } from "utilities/constants";

export function getDamagePerSecond({ range: { max, min }, rate }) {
  return ((max + min) / 2 / (rate / 1000)).toFixed(2);
}

// https://en.wikipedia.org/wiki/Triangular_number
export function getTriangularNumber(number) {
  return (number * (number + 1)) / 2;
}

export function getFromRange({ max, min }) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateWeapon({ level, name, type }) {
  const { cost, damageModifier, rateRange } = WEAPON_TYPE[type];
  const baseDamage = Math.ceil(level * damageModifier);

  return {
    cost,
    damage: { min: baseDamage, max: baseDamage + level },
    name: name || SLIM.generate("item"),
    rate: getFromRange(rateRange),
    type,
  };
}
