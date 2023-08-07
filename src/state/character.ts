import { atom, selector } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { stamina } from "@neverquest/state/reserves";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";

// SELECTORS

export const canAttackOrParry = withStateKey("canAttackOrParry", (key) =>
  selector({
    get: ({ get }) => get(stamina) >= get(weapon).staminaCost,
    key,
  }),
);

export const canBlock = withStateKey("canBlock", (key) =>
  selector({
    get: ({ get }) => get(stamina) >= get(shield).staminaCost,
    key,
  }),
);

export const canDodge = withStateKey("canDodge", (key) =>
  selector({
    get: ({ get }) => get(stamina) >= get(armor).staminaCost,
    key,
  }),
);

export const isLooting = withStateKey("isLooting", (key) =>
  selector({
    get: ({ get }) => get(lootingDuration) > 0,
    key,
  }),
);

export const isRecovering = withStateKey("isRecovering", (key) =>
  selector({
    get: ({ get }) => get(recoveryDuration) > 0,
    key,
  }),
);

// ATOMS

export const attackDuration = withStateKey("attackDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  }),
);

export const isAttacking = withStateKey("isAttacking", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  }),
);

export const isGameOver = withStateKey("isGameOver", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  }),
);

export const lootingDuration = withStateKey("lootingDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  }),
);

export const lootingRate = withStateKey("lootingRate", (key) =>
  atom({
    default: 2500,
    effects: [handleLocalStorage<number>({ key })],
    key,
  }),
);

export const name = withStateKey("name", (key) =>
  atom({
    default: LABEL_UNKNOWN,
    effects: [handleLocalStorage<string>({ key })],
    key,
  }),
);

export const recoveryDuration = withStateKey("recoveryDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  }),
);

export const statusElement = withStateKey("statusElement", (key) =>
  atom<HTMLDivElement | null>({
    default: null,
    effects: [handleLocalStorage<HTMLDivElement | null>({ key })],
    key,
  }),
);
