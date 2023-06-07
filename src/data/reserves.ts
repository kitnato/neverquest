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

export const RESERVES = {
  encumbrance: {
    atom: encumbrance,
    atomMaximum: encumbranceMaximum,
  },
  health: {
    atom: healthCurrent,
    atomDeltaRegenerationRate: deltas("healthRegenerationRate"),
    atomIsAtMaximum: isHealthAtMaximum,
    atomMaximum: healthMaximum,
    atomRegenerationAmount: healthRegenerationAmount,
    atomRegenerationDuration: healthRegenerationDuration,
    atomRegenerationRate: healthRegenerationRate,
    useActionChange: useChangeHealth,
  },
  monsterHealth: {
    atom: monsterHealthCurrent,
    atomMaximum: monsterHealthMaximum,
  },
  stamina: {
    atom: staminaCurrent,
    atomDeltaRegenerationRate: deltas("staminaRegenerationRate"),
    atomIsAtMaximum: isStaminaAtMaximum,
    atomMaximum: staminaMaximumTotal,
    atomRegenerationAmount: staminaRegenerationAmount,
    atomRegenerationDuration: staminaRegenerationDuration,
    atomRegenerationRate: staminaRegenerationRate,
    useActionChange: useChangeStamina,
  },
};
