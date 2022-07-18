import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { UNKNOWN } from "@neverquest/utilities/constants";
import { getTriangularNumber } from "@neverquest/utilities/helpers";

// PRIMITIVES

export const characterLevel = atomWithReset(0);

export const hasKnapsack = atomWithReset(false);

export const isAttacking = atomWithReset(false);

export const isLooting = atomWithReset(false);

export const isRecovering = atomWithReset(false);

export const lootingRate = atomWithReset(2500);

export const name = atomWithReset(UNKNOWN);

export const statusElement = atomWithReset<HTMLDivElement | null>(null);

// READERS

export const essenceAbsorbed = atom((get) => {
  let total = 0;

  for (let i = 0; i <= get(characterLevel); i++) {
    total += getTriangularNumber(i);
  }

  return total;
});
