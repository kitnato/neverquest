import { atom } from "recoil";

import { DeltaDisplay } from "neverquest/types/ui";
import { DELTA_DEFAULT } from "neverquest/utilities/constants";

export const deltaAether = atom<DeltaDisplay>({
  key: "deltaAether",
  default: DELTA_DEFAULT,
});

export const deltaAetherLoot = atom<DeltaDisplay>({
  key: "deltaAetherLoot",
  default: DELTA_DEFAULT,
});

export const deltaCoins = atom<DeltaDisplay>({
  key: "deltaCoins",
  default: DELTA_DEFAULT,
});

export const deltaCoinsLoot = atom<DeltaDisplay>({
  key: "deltaCoinsLoot",
  default: DELTA_DEFAULT,
});

export const deltaDamagePerSecond = atom<DeltaDisplay>({
  key: "deltaDamagePerSecond",
  default: DELTA_DEFAULT,
});

export const deltaExperience = atom<DeltaDisplay>({
  key: "deltaExperience",
  default: DELTA_DEFAULT,
});

export const deltaExperienceSpent = atom<DeltaDisplay>({
  key: "deltaExperienceSpent",
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

export const deltaCharacterLevel = atom<DeltaDisplay>({
  key: "deltaCharacterLevel",
  default: DELTA_DEFAULT,
});

export const deltaScrap = atom<DeltaDisplay>({
  key: "deltaScrap",
  default: DELTA_DEFAULT,
});

export const deltaScrapLoot = atom<DeltaDisplay>({
  key: "deltaScrapLoot",
  default: DELTA_DEFAULT,
});

export const deltaStamina = atom<DeltaDisplay>({
  key: "deltaStamina",
  default: DELTA_DEFAULT,
});

export const deltaTotalAttackRate = atom<DeltaDisplay>({
  key: "deltaTotalAttackRate",
  default: DELTA_DEFAULT,
});

export const deltaTotalDamage = atom<DeltaDisplay>({
  key: "deltaTotalDamage",
  default: DELTA_DEFAULT,
});

export const deltaTotalHealthRegenerationRate = atom<DeltaDisplay>({
  key: "deltaTotalHealthRegenerationRate",
  default: DELTA_DEFAULT,
});

export const deltaTotalProtection = atom<DeltaDisplay>({
  key: "deltaTotalProtection",
  default: DELTA_DEFAULT,
});

export const deltaTotalRecoveryRate = atom<DeltaDisplay>({
  key: "deltaTotalRecoveryRate",
  default: DELTA_DEFAULT,
});

export const deltaTotalStaminaRegenerationRate = atom<DeltaDisplay>({
  key: "deltaTotalStaminaRegenerationRate",
  default: DELTA_DEFAULT,
});
