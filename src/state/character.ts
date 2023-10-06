import { atom, selector } from "recoil";

import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { armor, ownedItem, shield, weapon } from "@neverquest/state/items";
import { stamina } from "@neverquest/state/reserves";
import type { AmmunitionPouchItem } from "@neverquest/types";
import { isRanged } from "@neverquest/types/type-guards";

// SELECTORS

export const canAttackOrParry = withStateKey("canAttackOrParry", (key) =>
  selector({
    get: ({ get }) => get(stamina) >= get(weapon).staminaCost,
    key,
  }),
);

export const hasEnoughAmmunition = withStateKey("hasEnoughAmmunition", (key) =>
  selector({
    get: ({ get }) => {
      const ownedAmmunitionPouch = get(ownedItem("ammunition pouch"));
      const weaponValue = get(weapon);

      return isRanged(weaponValue)
        ? ownedAmmunitionPouch !== null &&
            (ownedAmmunitionPouch as AmmunitionPouchItem).current >= weaponValue.ammunitionCost
        : true;
    },
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
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const isAttacking = withStateKey("isAttacking", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const isGameOver = withStateKey("isGameOver", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const lootingDuration = withStateKey("lootingDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const name = withStateKey("name", (key) =>
  atom({
    default: LABEL_UNKNOWN,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const recoveryDuration = withStateKey("recoveryDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const statusElement = withStateKey("statusElement", (key) =>
  atom<HTMLDivElement | null>({
    default: null,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
