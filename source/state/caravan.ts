import { atom, atomFamily, selector } from "recoil";

import { CREW, MONOLOGUE_EMPTY } from "@neverquest/data/caravan";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import type { Armor, Melee, MerchantInventoryItem, Ranged, Shield } from "@neverquest/types";
import { CREW_MEMBER_TYPES, type CrewMember } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const isCaravanHired = withStateKey("isCaravanHired", (key) =>
  selector({
    get: ({ get }) => CREW_MEMBER_TYPES.every((crewMember) => get(isHired(crewMember))),
    key,
  }),
);

// ATOMS

export const activeCrewMember = withStateKey("activeCrewMember", (key) =>
  atom<CrewMember | undefined>({
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

export const expandedBuyback = withStateKey("expandedBuyback", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage({ key })],
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

export const isHired = withStateKey("isHired", (key) =>
  atomFamily<boolean, CrewMember>({
    default: false,
    effects: (crewMember) => [handleLocalStorage({ key, parameter: crewMember })],
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
  atomFamily<string, CrewMember>({
    default: (crewMember) => CREW[crewMember].monologues[1] ?? MONOLOGUE_EMPTY,
    effects: (crewMember) => [handleLocalStorage({ key, parameter: crewMember })],
    key,
  }),
);
