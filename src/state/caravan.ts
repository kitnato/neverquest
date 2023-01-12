import { DefaultValue, atom, atomFamily, selectorFamily } from "recoil";

import localStorage from "@neverquest/state/effects/localStorage";
import { InventoryMerchant } from "@neverquest/types";
import { CrewStatus, CrewType, StorageKey } from "@neverquest/types/enums";

interface CrewState {
  hireStatus: CrewStatus;
  monologueProgress: number;
}

// SELECTORS

export const crew = selectorFamily<CrewState, CrewType>({
  get:
    (type) =>
    ({ get }) =>
      get(crewMapping(type)),
  key: "crew",
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

// ATOMS

export const crewActive = atom<CrewType | null>({
  default: null,
  effects: [localStorage<CrewType | null>(StorageKey.CrewActive)],
  key: StorageKey.CrewActive,
});

export const crewHirable = atom<CrewType[]>({
  default: [],
  effects: [localStorage<CrewType[]>(StorageKey.CrewHirable)],
  key: StorageKey.CrewHirable,
});

const crewMapping = atomFamily<CrewState, CrewType>({
  default: {
    hireStatus: CrewStatus.Unavailable,
    monologueProgress: 0,
  },
  effects: (parameter) => [localStorage<CrewState>(`${StorageKey.CrewMapping}-${parameter}`)],
  key: StorageKey.CrewMapping,
});

export const merchantInventory = atom<InventoryMerchant>({
  default: {},
  effects: [localStorage<InventoryMerchant>(StorageKey.MerchantInventory)],
  key: StorageKey.MerchantInventory,
});
