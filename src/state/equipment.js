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
    armor: 0,
    block: 0,
    name: null,
    stagger: 0,
  },
});

export const weapon = atom({
  key: "weapon",
  default: {
    cost: 1,
    damage: { min: 1, max: 2 },
    name: "Fists",
    rate: 3000,
    type: "light",
  },
});
