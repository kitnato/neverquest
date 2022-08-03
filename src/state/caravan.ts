import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";

import { localStorageEffect } from "@neverquest/state/effects";
import { InventoryMerchant } from "@neverquest/types";
import { CrewStatus, CrewType, StorageKey } from "@neverquest/types/enums";

export interface CrewState {
  hireStatus: CrewStatus;
  monologueProgress: number;
}

// ATOMS

const caravanMapping = atomFamily<CrewState, CrewType>({
  default: {
    hireStatus: CrewStatus.Unavailable,
    monologueProgress: 0,
  },
  effects: (parameter) => [
    localStorageEffect<CrewState>(`${StorageKey.CaravanMapping}-${parameter}`),
  ],
  key: StorageKey.CaravanMapping,
});

export const crewHirable = atom<CrewType[]>({
  default: [],
  effects: [localStorageEffect<CrewType[]>(StorageKey.CrewHirable)],
  key: StorageKey.CrewHirable,
});

// SELECTORS

export const crew = selectorFamily<CrewState, CrewType>({
  key: "crew",
  get:
    (type) =>
    ({ get }) =>
      get(caravanMapping(type)),
  set:
    (type) =>
    ({ set }, status) => {
      if (status instanceof DefaultValue) {
        return;
      }

      set(caravanMapping(type), status);

      if (status.hireStatus === CrewStatus.Hirable) {
        set(crewHirable, (current) => [...current, type]);
      } else {
        set(crewHirable, (current) => current.filter((currentType) => currentType !== type));
      }
    },
});

export const merchantInventory = atom<InventoryMerchant>({
  default: {},
  key: "merchantInventory",
});
