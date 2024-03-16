import type { ArmorClass, ShieldClass, WeaponClass } from "@kitnato/locran/build/types"
import { atom, atomFamily, selector } from "recoil"

import { CREW, MONOLOGUE_EMPTY } from "@neverquest/data/caravan"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import type { Armor, Melee, MerchantInventoryItem, Ranged, Shield } from "@neverquest/types"
import {
  CREW_MEMBER_TYPES,
  type CrewMember,
  type FletcherOption,
  type Gear,
  type Grip,
} from "@neverquest/types/unions"
import { withStateKey } from "@neverquest/utilities/helpers"

// SELECTORS

export const isCaravanHired = withStateKey(`isCaravanHired`, (key) =>
  selector({
    get: ({ get }) => CREW_MEMBER_TYPES.every((crewMember) => get(isHired(crewMember))),
    key,
  }),
)

// ATOMS

export const activeCrewMember = withStateKey(`activeCrewMember`, (key) =>
  atom<CrewMember | undefined>({
    default: undefined,
    effects: [handleStorage({ key })],
    key,
  }),
)

export const blacksmithInventory = withStateKey(`blacksmithInventory`, (key) =>
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
    effects: [handleStorage({ key })],
    key,
  }),
)

export const blacksmithOptions = withStateKey(`blacksmithOptions`, (key) =>
  atom<{
    activeTab: Gear;
    armor: {
      gearClass: ArmorClass;
      level: number;
    };
    shield: {
      gearClass: ShieldClass;
      level: number;
    };
    weapon: {
      gearClass: WeaponClass;
      grip: Grip;
      level: number;
    };
  }>({
    default: {
      activeTab: `weapon`,
      armor: {
        gearClass: `light`,
        level: 0,
      },
      shield: {
        gearClass: `small`,
        level: 0,
      },
      weapon: {
        gearClass: `blunt`,
        grip: `one-handed`,
        level: 0,
      },
    },
    effects: [handleStorage({ key })],
    key,
  }),
)

export const expandedBuyback = withStateKey(`expandedBuyback`, (key) =>
  atom({
    default: true,
    effects: [handleStorage({ key })],
    key,
  }),
)

export const fletcherInventory = withStateKey(`fletcherInventory`, (key) =>
  atom<Ranged | undefined>({
    default: undefined,
    effects: [handleStorage({ key })],
    key,
  }),
)

export const fletcherOptions = withStateKey(`fletcherOptions`, (key) =>
  atom<{
    activeTab: FletcherOption;
    ammunition: number;
    ranged: {
      gearClass: WeaponClass;
      level: number;
    };
  }>({
    default: {
      activeTab: `ranged`,
      ammunition: 0,
      ranged: {
        gearClass: `blunt`,
        level: 0,
      },
    },
    effects: [handleStorage({ key })],
    key,
  }),
)

export const hasGeneratedOffer = withStateKey(`hasGeneratedOffer`, (key) =>
  atomFamily<boolean, number>({
    default: false,
    effects: (stage) => [handleStorage({ key, parameter: stage })],
    key,
  }),
)

export const isHired = withStateKey(`isHired`, (key) =>
  atomFamily<boolean, CrewMember>({
    default: false,
    effects: (crewMember) => [handleStorage({ key, parameter: crewMember })],
    key,
  }),
)

export const merchantInventory = withStateKey(`merchantInventory`, (key) =>
  atom<MerchantInventoryItem[]>({
    default: [],
    effects: [handleStorage({ key })],
    key,
  }),
)

export const monologue = withStateKey(`monologue`, (key) =>
  atomFamily<string, CrewMember>({
    default: (crewMember) => CREW[crewMember].monologues[1] ?? MONOLOGUE_EMPTY,
    effects: (crewMember) => [handleStorage({ key, parameter: crewMember })],
    key,
  }),
)
