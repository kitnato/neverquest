import { atom } from "jotai";

import { DeltaDisplay } from "neverquest/types/ui";
import { DELTA_DEFAULT } from "neverquest/utilities/constants";

// TODO - use atomFamily?

export const deltaAether = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaAetherLoot = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaCoins = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaCoinsLoot = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaDamagePerSecond = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaExperience = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaExperienceSpent = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaHealth = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaHealthMonster = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaCharacterLevel = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaScrap = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaScrapLoot = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaStamina = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaTotalAttackRate = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaTotalDamage = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaTotalHealthRegenerationRate = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaTotalProtection = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaTotalRecoveryRate = atom<DeltaDisplay>(DELTA_DEFAULT);

export const deltaTotalStaminaRegenerationRate = atom<DeltaDisplay>(DELTA_DEFAULT);
