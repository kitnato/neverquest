import { useRecoilCallback } from "recoil";

import { BLEED_DURATION } from "@neverquest/constants/attributes";
import useChangeStamina from "@neverquest/hooks/actions/useChangeStamina";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import {
  currentHealthMonster,
  monsterBleedingDuration,
  monsterStatusElement,
} from "@neverquest/state/monster";
import { canAttack } from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import { totalBleedChance, totalDamage } from "@neverquest/state/statistics";
import { DeltaType, SkillType } from "@neverquest/types/enums";
import { AnimationSpeed, AnimationType, FloatingText } from "@neverquest/types/ui";
import { animateElement, getSnapshotGetter } from "@neverquest/utilities/helpers";

export default function () {
  const changeStamina = useChangeStamina();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const { staminaCost } = get(weapon);

        if (get(canAttack)) {
          const hasInflictedBleed =
            get(monsterBleedingDuration) === 0 &&
            get(skills(SkillType.Bleed)) &&
            Math.random() <= get(totalBleedChance);

          let monsterHealth = get(currentHealthMonster) - get(totalDamage);

          if (monsterHealth < 0) {
            monsterHealth = 0;
          }

          if (staminaCost > 0) {
            changeStamina({ value: -staminaCost });
          }

          set(currentHealthMonster, monsterHealth);
          set(deltas(DeltaType.HealthMonster), {
            color: FloatingText.Negative,
            value: -get(totalDamage),
          });

          if (hasInflictedBleed) {
            set(monsterBleedingDuration, BLEED_DURATION);
          }

          animateElement({
            element: get(monsterStatusElement),
            speed: AnimationSpeed.Fast,
            type: AnimationType.HeadShake,
          });
        } else {
          set(deltas(DeltaType.Stamina), [
            {
              color: FloatingText.Neutral,
              value: "CANNOT ATTACK",
            },
            {
              color: FloatingText.Negative,
              value: ` (${staminaCost})`,
            },
          ]);
        }
      },
    []
  );
}
