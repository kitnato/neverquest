import { useRecoilCallback } from "recoil";

import useChangeHealth from "@neverquest/hooks/actions/useChangeHealth";
import useChangeStamina from "@neverquest/hooks/actions/useChangeStamina";
import { isRecovering, statusElement } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import {
  currentHealthMonster,
  isMonsterStaggered,
  monsterStatusElement,
  totalDamageMonster,
} from "@neverquest/state/monster";
import { canBlock } from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import {
  totalBlockChance,
  totalDodgeChance,
  totalParryChance,
  totalProtection,
} from "@neverquest/state/statistics";
import { DeltaType, ShowingType, SkillType } from "@neverquest/types/enums";
import { AnimationSpeed, AnimationType, DeltaDisplay, FloatingText } from "@neverquest/types/ui";
import { animateElement, getSnapshotGetter } from "@neverquest/utilities/helpers";

export default function () {
  const changeHealth = useChangeHealth();
  const changeStamina = useChangeStamina();

  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = getSnapshotGetter(snapshot);

    animateElement({
      element: get(statusElement),
      speed: AnimationSpeed.Fast,
      type: AnimationType.HeadShake,
    });

    const hasDodged = get(skills(SkillType.Dodge)) && Math.random() <= get(totalDodgeChance);

    if (hasDodged) {
      set(deltas(DeltaType.Health), {
        color: FloatingText.Neutral,
        value: "DODGED",
      });

      return;
    }

    const healthDamage = (() => {
      const damage = get(totalProtection) - get(totalDamageMonster);

      return damage < 0 ? damage : 0;
    })();

    if (healthDamage === 0) {
      set(deltas(DeltaType.Health), {
        color: FloatingText.Neutral,
        value: healthDamage,
      });

      return;
    }

    const hasBlocked = Math.random() <= get(totalBlockChance);

    if (hasBlocked) {
      const { staminaCost } = get(shield);

      if (get(canBlock)) {
        set(deltas(DeltaType.Health), {
          color: FloatingText.Neutral,
          value: "BLOCKED",
        });
        changeStamina({ value: -staminaCost });

        if (get(skills(SkillType.Stagger))) {
          set(isMonsterStaggered, true);
        }

        return;
      } else {
        set(deltas(DeltaType.Stamina), [
          {
            color: FloatingText.Neutral,
            value: "CANNOT BLOCK",
          },
          {
            color: FloatingText.Negative,
            value: ` (${staminaCost})`,
          },
        ]);
      }
    }

    const hasParried = get(skills(SkillType.Parry)) && Math.random() <= get(totalParryChance);

    if (!hasBlocked && hasParried) {
      const parryDamage = Math.floor(get(totalDamageMonster) / 2);

      set(currentHealthMonster, (current) => current - parryDamage);
      set(deltas(DeltaType.HealthMonster), [
        {
          color: FloatingText.Neutral,
          value: "PARRIED",
        },
        {
          color: FloatingText.Negative,
          value: ` (${parryDamage})`,
        },
      ]);

      animateElement({
        element: get(monsterStatusElement),
        speed: AnimationSpeed.Fast,
        type: AnimationType.HeadShake,
      });
    }

    let deltaHealthOverride: DeltaDisplay | undefined;

    if (get(totalProtection) > 0) {
      deltaHealthOverride = [
        {
          color: FloatingText.Negative,
          value: healthDamage,
        },
        {
          color: FloatingText.Neutral,
          value: ` (${get(totalProtection)})`,
        },
      ];
    }

    changeHealth({ delta: deltaHealthOverride, value: healthDamage });

    if (!get(isShowing(ShowingType.Recovery))) {
      set(isShowing(ShowingType.Recovery), true);
    }

    set(isRecovering, true);
  });
}
