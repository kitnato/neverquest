import { atom, atomFamily, selector } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { TRAIT_TYPES, type Trait } from "@neverquest/types/unions";

// SELECTORS

export const acquiredTraits = withStateKey("acquiredTraits", (key) =>
  selector({
    get: ({ get }) =>
      TRAIT_TYPES.reduce(
        (aggregator, current) => ({ ...aggregator, [current]: get(isTraitAcquired(current)) }),
        {} as Record<Trait, boolean>,
      ),
    key,
  }),
);

// ATOMS

export const isTraitAcquired = withStateKey("isTraitAcquired", (key) =>
  atomFamily<boolean, Trait>({
    default: false,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const selectedTrait = withStateKey("selectedTrait", (key) =>
  atom<Trait | null>({
    default: null,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
