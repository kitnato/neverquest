import { atom } from "recoil";

import { CrewType, MerchantInventory } from "neverquest/env.d";

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
