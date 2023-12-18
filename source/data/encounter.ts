import type { AffixStructure } from "@kitnato/locran/build/types";

export const AFFIX_STRUCTURE_WEIGHTS: [AffixStructure, number][] = [
  ["none", 0.05],
  ["prefixAndSuffix", 0.1],
  ["suffix", 0.2],
  ["prefix", 0.65],
];

export const PROGRESS = {
  maximum: 30,
  minimum: 3,
};

export const PROGRESS_REDUCTION = {
  maximum: 0.85,
  minimum: 0.3,
};
