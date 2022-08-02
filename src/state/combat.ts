import { selector } from "recoil";

import { isRecovering, statusElement } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { shield, weapon } from "@neverquest/state/inventory";
import {
  currentHealthMonster,
  isMonsterStaggered,
  monsterStatusElement,
  totalDamageMonster,
} from "@neverquest/state/monster";
import { canAttack, canBlock, healthChange, staminaChange } from "@neverquest/state/reserves";
import { isShowing } from "@neverquest/state/isShowing";
import { totalBlockChance, totalDamage, totalProtection } from "@neverquest/state/statistics";
import {
  AnimationSpeed,
  AnimationType,
  DeltaDisplay,
  FloatingTextType,
} from "@neverquest/types/ui";
import { animateElement } from "@neverquest/utilities/helpers";
import { DeltaType, ShowingType } from "@neverquest/types/enums";

// TODO: refactor as useRecoilTransaction(), as soon as it can handle selectors too

export const defense = selector({
  get: () => null,
  key: "defense",
  set: ({ get, set }) => {
    const totalProtectionValue = get(totalProtection);
    const healthDamage = (() => {
      const damage = totalProtectionValue - get(totalDamageMonster);

      return damage < 0 ? damage : 0;
    })();
    const deltaHealth = deltas(DeltaType.Health);

    animateElement({
      element: get(statusElement),
      speed: AnimationSpeed.Fast,
      type: AnimationType.HeadShake,
    });

    if (healthDamage === 0) {
      set(deltaHealth, {
        color: FloatingTextType.Neutral,
        value: "0",
      });
    } else {
      const canBlockValue = get(canBlock);
      const hasBlocked = Math.random() <= get(totalBlockChance);

      if (hasBlocked) {
        const { staminaCost } = get(shield);

        if (canBlockValue) {
          set(deltaHealth, {
            color: FloatingTextType.Neutral,
            value: "BLOCKED",
          });
          set(staminaChange, -staminaCost);
          set(isMonsterStaggered, true);
        } else {
          set(deltas(DeltaType.Stamina), [
            {
              color: FloatingTextType.Neutral,
              value: "CANNOT BLOCK",
            },
            {
              color: FloatingTextType.Negative,
              value: ` (${staminaCost})`,
            },
          ]);
        }
      } else {
        let deltaContents: DeltaDisplay = {
          color: FloatingTextType.Negative,
          value: `${healthDamage}`,
        };

        if (totalProtectionValue > 0) {
          deltaContents = [
            deltaContents,
            {
              color: FloatingTextType.Neutral,
              value: ` (${totalProtectionValue})`,
            },
          ];
        }

        set(healthChange, { delta: healthDamage, deltaContents });

        if (!get(isShowing(ShowingType.Recovery))) {
          set(isShowing(ShowingType.Recovery), true);
        }

        set(isRecovering, true);
      }
    }
  },
});

export const offense = selector({
  get: () => null,
  key: "offense",
  set: ({ get, set }) => {
    const { staminaCost } = get(weapon);

    if (get(canAttack)) {
      const element = get(monsterStatusElement);
      const totalDamageValue = get(totalDamage);
      let monsterHealth = get(currentHealthMonster) - totalDamageValue;

      if (monsterHealth < 0) {
        monsterHealth = 0;
      }

      if (staminaCost > 0) {
        set(staminaChange, -staminaCost);
      }

      set(currentHealthMonster, monsterHealth);
      set(deltas(DeltaType.HealthMonster), {
        color: FloatingTextType.Negative,
        value: `${-totalDamageValue}`,
      });

      animateElement({
        element,
        speed: AnimationSpeed.Fast,
        type: AnimationType.HeadShake,
      });
    } else {
      set(deltas(DeltaType.Stamina), [
        {
          color: FloatingTextType.Neutral,
          value: "CANNOT ATTACK",
        },
        {
          color: FloatingTextType.Negative,
          value: ` (${staminaCost})`,
        },
      ]);
    }
  },
});
