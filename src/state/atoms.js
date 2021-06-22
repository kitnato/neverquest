import { v4 as uuidv4 } from "uuid";
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
  default: "wilderness",
});

export const gameOver = atom({
  key: "gameOver",
  default: false,
});

export const attacking = atom({
  key: "attacking",
  default: false,
});

export const seed = atom({
  key: "seed",
  default: uuidv4(),
});
