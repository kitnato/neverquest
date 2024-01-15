import type { AffixStructure } from "@kitnato/locran/build/types";

export const AFFIX_STRUCTURE_WEIGHTS: [AffixStructure, number][] = [
  ["noAffix", 0.025],
  ["prefixAndSuffix", 0.075],
  ["suffix", 0.25],
  ["prefix", 0.65],
];

export const CORPSE_TAX = 0.5;

export const PROGRESS = {
  maximum: 30,
  minimum: 3,
};

export const PERKS = {
  essenceBonus: {
    maximum: 1.5,
    minimum: 0.5,
  },
  monsterReduction: {
    maximum: 0.75,
    minimum: 0.33,
  },
};
