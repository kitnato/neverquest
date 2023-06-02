import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import {
  healthRegenerationDuration,
  staminaRegenerationDuration,
} from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { encumbrance, encumbranceMaximum } from "@neverquest/state/inventory";
import { monsterHealthCurrent, monsterHealthMaximum } from "@neverquest/state/monster";
import {
  healthCurrent,
  healthMaximum,
  isHealthAtMaximum,
  isStaminaAtMaximum,
  staminaCurrent,
  staminaMaximumTotal,
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
    atom: healthCurrent,
    atomDeltaRegenerationRate: deltas(Delta.HealthRegenerationRate),
    atomIsAtMaximum: isHealthAtMaximum,
    atomMaximum: healthMaximum,
    atomRegenerationAmount: healthRegenerationAmount,
    atomRegenerationDuration: healthRegenerationDuration,
    atomRegenerationRate: healthRegenerationRate,
    useActionChange: useChangeHealth,
  },
  [Reserve.MonsterHealth]: {
    atom: monsterHealthCurrent,
    atomMaximum: monsterHealthMaximum,
  },
  [Reserve.Stamina]: {
    atom: staminaCurrent,
    atomDeltaRegenerationRate: deltas(Delta.StaminaRegenerationRate),
    atomIsAtMaximum: isStaminaAtMaximum,
    atomMaximum: staminaMaximumTotal,
    atomRegenerationAmount: staminaRegenerationAmount,
    atomRegenerationDuration: staminaRegenerationDuration,
    atomRegenerationRate: staminaRegenerationRate,
    useActionChange: useChangeStamina,
  },
};
