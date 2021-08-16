import { atom } from "recoil";

export const armor = atom({
  key: "armor",
  default: {
    name: null,
    value: 0,
  },
});

export const shield = atom({
  key: "shield",
  default: {
    name: null,
    block: 0,
    armor: 0,
    stagger: 0,
  },
});

export const weapon = atom({
  key: "weapon",
  default: {
    name: "Fists",
    type: "light",
    speed: 2000,
    cost: 1,
    damage: { min: 1, max: 2 },
  },
});
