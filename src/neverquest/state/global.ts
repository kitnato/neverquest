import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { merchantInventoryGeneration } from "neverquest/state/caravan";
import { monsterCreate } from "neverquest/state/monster";
import {
  currentHealth,
  maximumHealth,
  currentStamina,
  maximumStamina,
} from "neverquest/state/reserves";

// PRIMITIVES

export const autoEquip = atomWithReset(true);

export const gameOver = atomWithReset(false);

export const lowHealthWarning = atomWithReset(true);

export const nsfw = atomWithReset(true);

// WRITERS

export const initialization = atom(null, (get, set) => {
  set(currentHealth, get(maximumHealth));
  set(currentStamina, get(maximumStamina));
  set(merchantInventoryGeneration);
  set(monsterCreate);
});
