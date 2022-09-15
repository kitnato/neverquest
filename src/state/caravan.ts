import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";

import { localStorageEffect } from "@neverquest/state/effects";
import { InventoryMerchant } from "@neverquest/types";
import { CrewStatus, CrewType, StorageKey } from "@neverquest/types/enums";

interface CrewState {
  hireStatus: CrewStatus;
  monologueProgress: number;
}

// ATOMS

export const crewHirable = atom<CrewType[]>({
  default: [],
  effects: [localStorageEffect<CrewType[]>(StorageKey.CrewHirable)],
  key: StorageKey.CrewHirable,
});

const crewMapping = atomFamily<CrewState, CrewType>({
  default: {
    hireStatus: CrewStatus.Unavailable,
    monologueProgress: 0,
  },
  effects: (parameter) => [localStorageEffect<CrewState>(`${StorageKey.CrewMapping}-${parameter}`)],
  key: StorageKey.CrewMapping,
});

export const merchantInventory = atom<InventoryMerchant>({
  default: {},
  effects: [localStorageEffect<InventoryMerchant>(StorageKey.MerchantInventory)],
  key: StorageKey.MerchantInventory,
});

// SELECTORS

export const crew = selectorFamily<CrewState, CrewType>({
  key: "crew",
  get:
    (type) =>
    ({ get }) =>
      get(crewMapping(type)),
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
});
