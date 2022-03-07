import { atom } from "recoil";

export const crew = atom({
  key: "crew",
  default: {
    alchemist: false,
    blacksmith: false,
    cook: false,
    medic: false,
    mercenary: false,
    merchant: true,
    tailor: false,
    witch: false,
    wizard: false,
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
