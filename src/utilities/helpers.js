import SLIM from "slim";
import { WEAPON_SPECIFICATIONS } from "utilities/constants";

export function getDamagePerSecond({ range: { maximum, minimum }, rate }) {
  return ((maximum + minimum) / 2 / (rate / 1000)).toFixed(2);
}

// https://en.wikipedia.org/wiki/Triangular_number
export function getTriangularNumber(number) {
  return (number * (number + 1)) / 2;
}

export function getFromRange({ maximum, minimum }) {
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

export function generateWeapon({ level, name, type }) {
  const {
    damageModifier,
    rateRange,
    staminaCost,
    type: weaponType,
  } = WEAPON_SPECIFICATIONS[type];
  const baseDamage = Math.ceil(level * damageModifier);

  return {
    damage: { minimum: baseDamage, maximum: baseDamage + level },
    name: name || SLIM.generate("item"),
    rate: getFromRange(rateRange),
    staminaCost,
    type: weaponType,
  };
}
