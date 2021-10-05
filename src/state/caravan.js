import { atom } from "recoil";

// TODO
/* eslint-disable import/prefer-default-export */

export const crew = atom({
  key: "crew",
  default: {
    alchemist: false,
    blacksmith: false,
    cook: false,
    medic: false,
    mercenary: true,
    merchant: true,
    tailor: false,
    witch: false,
    wizard: false,
  },
});
