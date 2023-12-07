import type { NameStructure } from "@kitnato/locran/build/types";

export const NAME_STRUCTURE: Record<NameStructure, number> = {
  none: 0.05,
  prefix: 0.65,
  prefixAndSuffix: 0.1,
  suffix: 0.2,
};

export const PROGRESS = {
  maximum: 50,
  minimum: 3,
};

export const PROGRESS_REDUCTION = {
  maximum: 0.8,
  minimum: 0.33,
};
