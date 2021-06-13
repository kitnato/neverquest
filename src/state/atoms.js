import { atom } from "recoil";

export const location = atom({
  key: "location",
  default: "Unknown",
});

export const progress = atom({
  key: "progress",
  default: 0,
});

export const progressMaximum = atom({
  key: "progressMaximum",
  default: 3,
});
