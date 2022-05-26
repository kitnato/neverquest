import { atomWithReset } from "jotai/utils";

import { DeltaDisplay } from "neverquest/types/ui";
import { DELTA_DEFAULT } from "neverquest/utilities/constants";

// TODO - use atomFamily?

// PRIMITIVES

export const deltaAether = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaAetherLoot = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaCoins = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaCoinsLoot = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaDamagePerSecond = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaExperience = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaExperienceSpent = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaHealth = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaHealthMonster = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaCharacterLevel = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaScrap = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaScrapLoot = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaStamina = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaTotalAttackRate = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaTotalDamage = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaTotalHealthRegenerationRate = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaTotalProtection = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaTotalRecoveryRate = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);

export const deltaTotalStaminaRegenerationRate = atomWithReset<DeltaDisplay>(DELTA_DEFAULT);
