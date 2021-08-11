import { atom } from "recoil";

// TODO
/* eslint-disable import/prefer-default-export */

export const crew = atom({
  key: "crew",
  default: {
    merchant: true,
    mercenary: true,
    cook: false,
    blacksmith: false,
    alchemist: false,
    witch: false,
    tailor: false,
    wizard: false,
    medic: false,
  },
});
