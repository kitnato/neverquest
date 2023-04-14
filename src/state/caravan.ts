import { DefaultValue, atom, atomFamily, selectorFamily } from "recoil";

import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import type { InventoryBlacksmith, InventoryMerchant } from "@neverquest/types";
import { CrewStatus, type CrewType } from "@neverquest/types/enums";

type CrewState = {
  hireStatus: CrewStatus;
  monologueProgress: number;
};

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

export const blacksmithInventory = atom<InventoryBlacksmith>({
  default: {
    armor: null,
    shield: null,
    weapon: null,
  },
  effects: [handleLocalStorage<InventoryBlacksmith>({ key: "blacksmithInventory" })],
  key: "blacksmithInventory",
});

export const crewActive = atom<CrewType | null>({
  default: null,
  effects: [handleLocalStorage<CrewType | null>({ key: "crewActive" })],
  key: "crewActive",
});

export const crewHirable = atom<CrewType[]>({
  default: [],
  effects: [handleLocalStorage<CrewType[]>({ key: "crewHirable" })],
  key: "crewHirable",
});

const crewMapping = atomFamily<CrewState, CrewType>({
  default: {
    hireStatus: CrewStatus.Unavailable,
    monologueProgress: 0,
  },
  effects: (parameter) => [handleLocalStorage<CrewState>({ key: "crewMapping", parameter })],
  key: "crewMapping",
});

export const hasBoughtFromMerchant = atom({
  default: false,
  effects: [handleLocalStorage<boolean>({ key: "hasBoughtFromMerchant" })],
  key: "hasBoughtFromMerchant",
});

export const merchantInventory = atom<InventoryMerchant>({
  default: {},
  effects: [handleLocalStorage<InventoryMerchant>({ key: "merchantInventory" })],
  key: "merchantInventory",
});
