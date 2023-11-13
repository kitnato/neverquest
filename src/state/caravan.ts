import { atom, atomFamily, selector } from "recoil";

import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import type { BlacksmithInventory, MerchantInventoryItem, Weapon } from "@neverquest/types";
import { CREW_TYPES, type Crew, type CrewStatus } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const isCaravanHired = withStateKey("isCaravanHired", (key) =>
  selector({
    get: ({ get }) => CREW_TYPES.every((current) => get(hireStatus(current)) === "hired"),
    key,
  }),
);

// ATOMS

export const activeCrew = withStateKey("activeCrew", (key) =>
  atom<Crew | undefined>({
    default: undefined,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const blacksmithInventory = withStateKey("blacksmithInventory", (key) =>
  atom<BlacksmithInventory>({
    default: {
      armor: undefined,
      shield: undefined,
      weapon: undefined,
    },
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const hireStatus = withStateKey("hireStatus", (key) =>
  atomFamily<CrewStatus, Crew>({
    default: "hidden",
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const fletcherInventory = withStateKey("fletcherInventory", (key) =>
  atom<Weapon | undefined>({
    default: undefined,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const merchantInventory = withStateKey("merchantInventory", (key) =>
  atom<MerchantInventoryItem[]>({
    default: [],
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
