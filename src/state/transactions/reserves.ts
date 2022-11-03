import { DefaultValue, selector } from "recoil";

import { DEFAULT_RESERVE_CHANGE } from "@neverquest/constants";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import {
  currentHealth,
  currentStamina,
  maximumHealth,
  maximumStamina,
} from "@neverquest/state/reserves";
import { isGameOver } from "@neverquest/state/settings";
import { DeltaType, ShowingType } from "@neverquest/types/enums";
import { DeltaReserve, FloatingText } from "@neverquest/types/ui";

// TODO - better file name

export const healthChange = selector<DeltaReserve>({
  get: () => DEFAULT_RESERVE_CHANGE,
  key: "healthChange",
  set: ({ get, set }, change) => {
    if (change instanceof DefaultValue) {
      return;
    }

    const { delta, value } = change;
    const max = get(maximumHealth);
    const isPositive = value > 0;

    let newHealth = get(currentHealth) + value;

    set(
      deltas(DeltaType.Health),
      delta ?? {
        color: isPositive ? FloatingText.Positive : FloatingText.Negative,
        value: isPositive ? `+${value}` : value,
      }
    );

    if (newHealth <= 0) {
      newHealth = 0;
      set(isGameOver, true);
      set(isShowing(ShowingType.GameOver), true);
    }

    if (newHealth > max) {
      newHealth = max;
    }

    set(currentHealth, newHealth);
  },
});

export const staminaChange = selector<DeltaReserve>({
  get: () => DEFAULT_RESERVE_CHANGE,
  key: "staminaChange",
  set: ({ get, set }, change) => {
    if (change instanceof DefaultValue) {
      return;
    }

    const { value } = change;
    const max = get(maximumStamina);
    let newStamina = get(currentStamina) + value;

    set(deltas(DeltaType.Stamina), {
      color: value > 0 ? FloatingText.Positive : FloatingText.Negative,
      value: value > 0 ? `+${value}` : value,
    });

    if (newStamina < 0) {
      newStamina = 0;
    }

    if (newStamina > max) {
      newStamina = max;
    }

    set(currentStamina, newStamina);
  },
});
