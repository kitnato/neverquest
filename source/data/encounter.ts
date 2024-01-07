import type { AffixStructure } from "@kitnato/locran/build/types";

export const AFFIX_STRUCTURE_WEIGHTS: [AffixStructure, number][] = [
  ["none", 0.025],
  ["prefixAndSuffix", 0.075],
  ["suffix", 0.25],
  ["prefix", 0.65],
];

export const CORPSE_TAX = 0.25;

export const PROGRESS = {
  maximum: 30,
  minimum: 3,
};

export const PROGRESS_REDUCTION = {
  maximum: 0.75,
  minimum: 0.3,
};
