import { atom } from "recoil";

import { CrewType, MerchantInventory } from "neverquest/env";
import { UNKNOWN } from "neverquest/utilities/constants";

export const crew = atom({
  key: "crew",
  default: {
    [CrewType.Alchemist]: false,
    [CrewType.Blacksmith]: false,
    [CrewType.Cook]: false,
    [CrewType.Medic]: false,
    [CrewType.Mercenary]: false,
    [CrewType.Merchant]: true,
    [CrewType.Tailor]: false,
    [CrewType.Witch]: false,
    [CrewType.Wizard]: false,
  },
});

export const crewMonologues = atom({
  key: "crewMonologues",
  default: {
    // TODO - move to JSON with addressable objects based on states/events
    [CrewType.Alchemist]: [() => ""],
    [CrewType.Blacksmith]: [() => ""],
    [CrewType.Cook]: [() => ""],
    [CrewType.Medic]: [() => ""],
    [CrewType.Mercenary]: [() => ""],
    [CrewType.Merchant]: [
      () => "Greetings, stranger. I have what you're looking for.",
      (name: string) =>
        `Welcome ${name !== UNKNOWN ? "back" : name}. Let me help you find what you need.`,
    ],
    [CrewType.Tailor]: [() => ""],
    [CrewType.Witch]: [() => ""],
    [CrewType.Wizard]: [() => ""],
  },
});

export const exchangeCoin = atom({
  key: "exchangeCoin",
  default: 1,
});

export const exchangeScrap = atom({
  key: "exchangeScrap",
  default: 3,
});

export const merchantInventory = atom<MerchantInventory>({
  key: "merchantInventory",
  default: {},
});
