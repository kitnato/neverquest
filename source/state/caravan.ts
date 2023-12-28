import { atom, atomFamily, selector } from "recoil";

import { CREW } from "@neverquest/data/caravan";
import { EMPTY_MONOLOGUE } from "@neverquest/data/general";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import type { Armor, Melee, MerchantInventoryItem, Ranged, Shield } from "@neverquest/types";
import { CREW_TYPES, type Crew, type CrewStatus } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const isCaravanHired = withStateKey("isCaravanHired", (key) =>
  selector({
    get: ({ get }) => CREW_TYPES.every((crew) => get(hireStatus(crew)) === "hired"),
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
  atom<{
    armor: Armor | undefined;
    shield: Shield | undefined;
    weapon: Melee | undefined;
  }>({
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
    effects: (crew) => [handleLocalStorage({ key, parameter: crew })],
    key,
  }),
);

export const fletcherInventory = withStateKey("fletcherInventory", (key) =>
  atom<Ranged | undefined>({
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

export const monologue = withStateKey("monologue", (key) =>
  atomFamily<string, Crew>({
    default: (crew) => CREW[crew].monologues[1] ?? EMPTY_MONOLOGUE,
    effects: (crew) => [handleLocalStorage({ key, parameter: crew })],
    key,
  }),
);
