import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import {
  healthRegenerationDuration,
  staminaRegenerationDuration,
} from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { encumbrance, encumbranceMaximum } from "@neverquest/state/inventory";
import { monsterCurrentHealth, monsterMaximumHealth } from "@neverquest/state/monster";
import {
  currentHealth,
  currentStamina,
  isHealthAtMaximum,
  isStaminaAtMaximum,
  maximumHealth,
  maximumStaminaTotal,
} from "@neverquest/state/reserves";
import {
  healthRegenerationAmount,
  healthRegenerationRate,
  staminaRegenerationAmount,
  staminaRegenerationRate,
} from "@neverquest/state/statistics";
import { Delta, Reserve } from "@neverquest/types/enums";

export const RESERVES = {
  [Reserve.Encumbrance]: {
    atom: encumbrance,
    atomMaximum: encumbranceMaximum,
  },
  [Reserve.Health]: {
    atom: currentHealth,
    atomDeltaRegenerationRate: deltas(Delta.HealthRegenerationRate),
    atomIsAtMaximum: isHealthAtMaximum,
    atomMaximum: maximumHealth,
    atomRegenerationAmount: healthRegenerationAmount,
    atomRegenerationDuration: healthRegenerationDuration,
    atomRegenerationRate: healthRegenerationRate,
    useActionChange: useChangeHealth,
  },
  [Reserve.MonsterHealth]: {
    atom: monsterCurrentHealth,
    atomMaximum: monsterMaximumHealth,
  },
  [Reserve.Stamina]: {
    atom: currentStamina,
    atomDeltaRegenerationRate: deltas(Delta.StaminaRegenerationRate),
    atomIsAtMaximum: isStaminaAtMaximum,
    atomMaximum: maximumStaminaTotal,
    atomRegenerationAmount: staminaRegenerationAmount,
    atomRegenerationDuration: staminaRegenerationDuration,
    atomRegenerationRate: staminaRegenerationRate,
    useActionChange: useChangeStamina,
  },
};
