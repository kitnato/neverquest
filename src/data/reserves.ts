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
  maximumStamina,
} from "@neverquest/state/reserves";
import {
  healthRegenerationAmount,
  healthRegenerationRate,
  staminaRegenerationAmount,
  staminaRegenerationRate,
} from "@neverquest/state/statistics";
import { DeltaType, ReserveType } from "@neverquest/types/enums";

export const RESERVES = {
  [ReserveType.Encumbrance]: {
    atom: encumbrance,
    atomMaximum: encumbranceMaximum,
  },
  [ReserveType.Health]: {
    atom: currentHealth,
    atomDeltaRegenerationRate: deltas(DeltaType.HealthRegenerationRate),
    atomIsAtMaximum: isHealthAtMaximum,
    atomMaximum: maximumHealth,
    atomRegenerationAmount: healthRegenerationAmount,
    atomRegenerationDuration: healthRegenerationDuration,
    atomRegenerationRate: healthRegenerationRate,
    useActionChange: useChangeHealth,
  },
  [ReserveType.MonsterHealth]: {
    atom: monsterCurrentHealth,
    atomMaximum: monsterMaximumHealth,
  },
  [ReserveType.Stamina]: {
    atom: currentStamina,
    atomDeltaRegenerationRate: deltas(DeltaType.StaminaRegenerationRate),
    atomIsAtMaximum: isStaminaAtMaximum,
    atomMaximum: maximumStamina,
    atomRegenerationAmount: staminaRegenerationAmount,
    atomRegenerationDuration: staminaRegenerationDuration,
    atomRegenerationRate: staminaRegenerationRate,
    useActionChange: useChangeStamina,
  },
};
