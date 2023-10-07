import { atomFamily, selector } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { Trait } from "@neverquest/types/unions";

// SELECTORS

export const acquiredTraits = withStateKey("acquiredTraits", (key) =>
  selector<Record<Trait, boolean>>({
    get: ({ get }) => ({
      brawler: get(isTraitAcquired("brawler")),
      bruiser: get(isTraitAcquired("bruiser")),
      colossus: get(isTraitAcquired("colossus")),
      executioner: get(isTraitAcquired("executioner")),
      "field surgeon": get(isTraitAcquired("field surgeon")),
      inoculated: get(isTraitAcquired("inoculated")),
      nudist: get(isTraitAcquired("nudist")),
      sharpshooter: get(isTraitAcquired("sharpshooter")),
      shredder: get(isTraitAcquired("shredder")),
      stalwart: get(isTraitAcquired("stalwart")),
      tank: get(isTraitAcquired("tank")),
      tormentor: get(isTraitAcquired("tormentor")),
    }),
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
