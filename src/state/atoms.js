import { atom } from "recoil";

export const activeMonster = atom({
  key: "activeMonster",
  default: 0,
});

export const level = atom({
  key: "level",
  default: 1,
});

export const location = atom({
  key: "location",
  default: "???",
});

export const progress = atom({
  key: "progress",
  default: 0,
});

export const mode = atom({
  key: "mode",
  default: "exploration",
});

export const gameOver = atom({
  key: "gameOver",
  default: false,
});
