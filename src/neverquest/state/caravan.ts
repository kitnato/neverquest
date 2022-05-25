import { atom } from "jotai";

import { CrewType, Inventory } from "neverquest/types/core";

export const crew = atom<Record<CrewType, boolean>>({
  [CrewType.Alchemist]: false,
  [CrewType.Blacksmith]: false,
  [CrewType.Cook]: false,
  [CrewType.Medic]: false,
  [CrewType.Mercenary]: false,
  [CrewType.Merchant]: true,
  [CrewType.Tailor]: false,
  [CrewType.Witch]: false,
  [CrewType.Wizard]: false,
});

export const crewMonologues = atom<Record<CrewType, string>>({
  // TODO - move to JSON with addressable objects based on states/events
  [CrewType.Alchemist]: "",
  [CrewType.Blacksmith]: "",
  [CrewType.Cook]: "",
  [CrewType.Medic]: "",
  [CrewType.Mercenary]: "",
  [CrewType.Merchant]: "Greetings, stranger. I have what you're looking for.",
  [CrewType.Tailor]: "",
  [CrewType.Witch]: "",
  [CrewType.Wizard]: "",
});

export const exchangeCoin = atom(1);

export const exchangeScrap = atom(3);

export const merchantInventory = atom<Inventory>({});
