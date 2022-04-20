import { atom } from "recoil";

import { DeltaDisplay } from "neverquest/env";
import { DELTA_DEFAULT } from "neverquest/utilities/constants";

export const deltaCoins = atom<DeltaDisplay>({
  key: "deltaCoins",
  default: DELTA_DEFAULT,
});

export const deltaExperience = atom<DeltaDisplay>({
  key: "deltaExperience",
  default: DELTA_DEFAULT,
});

export const deltaHealth = atom<DeltaDisplay>({
  key: "deltaHealth",
  default: DELTA_DEFAULT,
});

export const deltaHealthMonster = atom<DeltaDisplay>({
  key: "deltaHealthMonster",
  default: DELTA_DEFAULT,
});

export const deltaScrap = atom<DeltaDisplay>({
  key: "deltaScrap",
  default: DELTA_DEFAULT,
});

export const deltaStamina = atom<DeltaDisplay>({
  key: "deltaStamina",
  default: DELTA_DEFAULT,
});
