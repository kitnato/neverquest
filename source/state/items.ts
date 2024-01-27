import { atom, atomFamily, selectorFamily } from "recoil";

import { LEVELLING_MAXIMUM } from "@neverquest/data/general";
import {
  AMMUNITION_CAPACITY,
  INFUSABLES,
  INFUSION_BASE,
  INFUSION_DELTA,
  INFUSION_DURATION,
} from "@neverquest/data/items";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { ownedItem } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import type { Infusable } from "@neverquest/types/unions";
import { getFromRange, getSigmoid, getTriangular } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const infusionEffect = withStateKey("infusionEffect", (key) =>
  selectorFamily({
    get:
      (infusable: Infusable) =>
      ({ get }) =>
        get(ownedItem(infusable)) === undefined
          ? 0
          : getFromRange({
              factor: getSigmoid(get(infusionLevel(infusable))),
              ...INFUSABLES[infusable].item.effect,
            }),
    key,
  }),
);

export const infusionMaximum = withStateKey("infusionMaximum", (key) =>
  selectorFamily({
    get:
      (infusable: Infusable) =>
      ({ get }) =>
        getTriangular(get(infusionLevel(infusable)) + INFUSION_BASE),
    key,
  }),
);

export const infusionStep = withStateKey("infusionStep", (key) =>
  selectorFamily({
    get:
      (infusable: Infusable) =>
      ({ get }) =>
        Math.min(
          get(essence),
          (get(infusionMaximum(infusable)) / INFUSION_DURATION) * INFUSION_DELTA,
        ),
    key,
  }),
);

export const isInfusionAtMaximum = withStateKey("isInfusionAtMaximum", (key) =>
  selectorFamily({
    get:
      (infusable: Infusable) =>
      ({ get }) =>
        get(infusionLevel(infusable)) >= LEVELLING_MAXIMUM,
    key,
  }),
);

// ATOMS

export const ammunition = withStateKey("ammunition", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const ammunitionCapacity = withStateKey("ammunitionCapacity", (key) =>
  atom({
    default: AMMUNITION_CAPACITY,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const infusion = withStateKey("infusion", (key) =>
  atomFamily<number, Infusable>({
    default: 0,
    effects: (infusable) => [handleLocalStorage({ key, parameter: infusable })],
    key,
  }),
);

export const infusionLevel = withStateKey("infusionLevel", (key) =>
  atomFamily<number, Infusable>({
    default: 0,
    effects: (infusable) => [handleLocalStorage({ key, parameter: infusable })],
    key,
  }),
);

export const isWeaving = withStateKey("isWeaving", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
