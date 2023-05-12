import { DefaultValue, atom, atomFamily, selectorFamily } from "recoil";
import { handleLocalStorage, withStateKey } from "@neverquest/state";

import type { InventoryBlacksmith, InventoryMerchant } from "@neverquest/types";
import { type CrewMember, CrewStatus } from "@neverquest/types/enums";

type CrewState = {
  hireStatus: CrewStatus;
  monologueProgress: number;
};

// SELECTORS

export const crew = withStateKey("crew", (key) =>
  selectorFamily<CrewState, CrewMember>({
    get:
      (type) =>
      ({ get }) =>
        get(crewMapping(type)),
    key,
    set:
      (type) =>
      ({ set }, status) => {
        if (status instanceof DefaultValue) {
          return;
        }

        set(crewMapping(type), status);

        if (status.hireStatus === CrewStatus.Hirable) {
          set(crewHirable, (current) => [...current, type]);
        } else {
          set(crewHirable, (current) => current.filter((currentType) => currentType !== type));
        }
      },
  })
);

// ATOMS

export const blacksmithInventory = withStateKey("blacksmithInventory", (key) =>
  atom<InventoryBlacksmith>({
    default: {
      armor: null,
      shield: null,
      weapon: null,
    },
    effects: [handleLocalStorage<InventoryBlacksmith>({ key })],
    key,
  })
);

export const crewActive = withStateKey("crewActive", (key) =>
  atom<CrewMember | null>({
    default: null,
    effects: [handleLocalStorage<CrewMember | null>({ key })],
    key,
  })
);

export const crewHirable = withStateKey("crewHirable", (key) =>
  atom<CrewMember[]>({
    default: [],
    effects: [handleLocalStorage<CrewMember[]>({ key })],
    key,
  })
);

const crewMapping = withStateKey("crewMapping", (key) =>
  atomFamily<CrewState, CrewMember>({
    default: {
      hireStatus: CrewStatus.Unavailable,
      monologueProgress: 0,
    },
    effects: (parameter) => [handleLocalStorage<CrewState>({ key, parameter })],
    key,
  })
);

export const hasBoughtFromMerchant = withStateKey("hasBoughtFromMerchant", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  })
);

export const merchantInventory = withStateKey("merchantInventory", (key) =>
  atom<InventoryMerchant>({
    default: {},
    effects: [handleLocalStorage<InventoryMerchant>({ key })],
    key,
  })
);
