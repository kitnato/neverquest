import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { CREW_ORDER } from "@neverquest/data/caravan";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type {
  BlacksmithInventory,
  InventoryItem,
  MerchantInventory,
  Weapon,
} from "@neverquest/types";
import { isTrinket } from "@neverquest/types/type-guards";
import type { Consumable, Crew, CrewStatus, Trinket } from "@neverquest/types/unions";

// SELECTORS

export const isCrewHired = withStateKey("isCrewHired", (key) =>
  selector({
    get: ({ get }) => CREW_ORDER.every((type) => get(hireStatus(type)).status === "hired"),
    key,
  }),
);

export const merchantItem = withStateKey("merchantItem", (key) =>
  selectorFamily<InventoryItem | null, Consumable | Trinket>({
    get:
      (parameter) =>
      ({ get }) =>
        get(merchantInventory).find(({ item }) => isTrinket(item) && item.type === parameter)
          ?.item ?? null,
    key,
  }),
);

// ATOMS

export const blacksmithInventory = withStateKey("blacksmithInventory", (key) =>
  atom<BlacksmithInventory>({
    default: {
      armor: null,
      shield: null,
      weapon: null,
    },
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const crewActive = withStateKey("crewActive", (key) =>
  atom<Crew | null>({
    default: null,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const hasBoughtFromMerchant = withStateKey("hasBoughtFromMerchant", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

// Must use { status } object instead of just CrewStatus, otherwise onSet() does not trigger in useInitializer().
export const hireStatus = withStateKey("hireStatus", (key) =>
  atomFamily<{ status: CrewStatus }, Crew>({
    default: { status: null },
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const fletcherInventory = withStateKey("fletcherInventory", (key) =>
  atom<Weapon | null>({
    default: null,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const merchantInventory = withStateKey("merchantInventory", (key) =>
  atom<MerchantInventory>({
    default: [],
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
