import { atom, selector } from "recoil";

import { LABEL_UNKNOWN } from "@neverquest/data/constants";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { maximumStamina, staminaDebuff } from "@neverquest/state/reserves";

// SELECTORS

export const isBlighted = withStateKey("isBlighted", (key) =>
  selector({
    get: ({ get }) => get(maximumStamina) === get(staminaDebuff),
    key,
  })
);

export const isLooting = withStateKey("isLooting", (key) =>
  selector({
    get: ({ get }) => get(lootingDuration) > 0,
    key,
  })
);

export const isRecovering = withStateKey("isRecovering", (key) =>
  selector({
    get: ({ get }) => get(recoveryDuration) > 0,
    key,
  })
);

// ATOMS

export const attackDuration = withStateKey("attackDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const isAttacking = withStateKey("isAttacking", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  })
);

export const isGameOver = withStateKey("isGameOver", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  })
);

export const healthRegenerationDuration = withStateKey("healthRegenerationDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const lootingDuration = withStateKey("lootingDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const lootingRate = withStateKey("lootingRate", (key) =>
  atom({
    default: 2500,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const name = withStateKey("name", (key) =>
  atom({
    default: LABEL_UNKNOWN,
    effects: [handleLocalStorage<string>({ key })],
    key,
  })
);

export const poisonDuration = withStateKey("poisonDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const recoveryDuration = withStateKey("recoveryDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const staminaRegenerationDuration = withStateKey("staminaRegenerationDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const statusElement = withStateKey("statusElement", (key) =>
  atom<HTMLDivElement | null>({
    default: null,
    effects: [handleLocalStorage<HTMLDivElement | null>({ key })],
    key,
  })
);
