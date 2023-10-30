import { useRecoilCallback } from "recoil";

import { LOOTING_RATE } from "@neverquest/data/statistics";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { attackDuration, lootingDuration } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import {
  monsterAttackDuration,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { DeltaDisplay, DeltaReserveBase } from "@neverquest/types/ui";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeMonsterHealth() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      ({
        damageType,
        delta,
        value,
      }: DeltaReserveBase & {
        damageType?: "bleed" | "critical" | "execute" | "parry" | "thorns";
      }) => {
        const get = getSnapshotGetter(snapshot);

        const formattedValue = formatNumber({ value });
        const isPositive = value > 0;

        const newHealth = get(monsterHealth) + value;
        const max = get(monsterHealthMaximum);

        set(
          deltas("monsterHealth"),
          delta === undefined || (Array.isArray(delta) && delta.length === 0)
            ? ({
                color: isPositive ? "text-success" : "text-danger",
                value: isPositive ? `+${formattedValue}` : formattedValue,
              } as DeltaDisplay)
            : delta,
        );

        if (newHealth <= 0) {
          if (damageType !== undefined) {
            switch (damageType) {
              case "bleed": {
                progressQuest("bleedingKill");
                break;
              }

              case "critical": {
                progressQuest("criticalKilling");
                break;
              }

              case "execute": {
                progressQuest("executing");
                break;
              }

              case "parry": {
                progressQuest("parryingKill");
                break;
              }

              case "thorns": {
                progressQuest("thornsKill");
                break;
              }
            }
          }

          progressQuest("killing");
          set(monsterHealth, 0);
          set(lootingDuration, get(isTraitAcquired("ninja")) ? 1 : LOOTING_RATE);

          reset(attackDuration);
          reset(monsterAttackDuration);

          return;
        }

        if (newHealth > max) {
          set(monsterHealth, max);

          return;
        }

        set(monsterHealth, newHealth);
      },
    [progressQuest],
  );
}
