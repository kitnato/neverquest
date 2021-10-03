import { atom } from "recoil";

import { NO_ARMOR, NO_SHIELD, NO_WEAPON } from "utilities/constants";

export const armor = atom({
  key: "armor",
  default: NO_ARMOR,
});

export const shield = atom({
  key: "shield",
  default: NO_SHIELD,
});

export const weapon = atom({
  key: "weapon",
  default: NO_WEAPON,
});
