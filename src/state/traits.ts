import { atom, atomFamily, selector } from "recoil";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";

import { TRAIT_TYPES, type Trait } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const acquiredTraits = withStateKey("acquiredTraits", (key) =>
  selector({
    get: ({ get }) =>
      // eslint-disable-next-line unicorn/no-array-reduce
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
  atom<Trait | undefined>({
    default: undefined,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
