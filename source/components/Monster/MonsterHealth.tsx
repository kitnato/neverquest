import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterHealthMeter } from "@neverquest/components/Monster/MonsterHealthMeter";
import { MONSTER_REGENERATION } from "@neverquest/data/monster";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import IconMonsterHealth from "@neverquest/icons/monster-health.svg?react";
import {
  isMonsterAiling,
  isMonsterAtFullHealth,
  isMonsterDead,
  monsterHealthMaximum,
  monsterRegenerationDelta,
} from "@neverquest/state/monster";
import { getAmountPerTick } from "@neverquest/utilities/getters";

export function MonsterHealth() {
  const isMonsterBurning = useRecoilValue(isMonsterAiling("burning"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterAtFullHealthValue = useRecoilValue(isMonsterAtFullHealth);
  const monsterHealthMaximumValue = useRecoilValue(monsterHealthMaximum);
  const resetMonsterRegenerationDelta = useResetRecoilState(monsterRegenerationDelta);
  const setMonsterRegenerationDelta = useSetRecoilState(monsterRegenerationDelta);

  const changeMonsterHealth = useChangeMonsterHealth();

  const { duration, ticks } = MONSTER_REGENERATION;
  const regenerationAmount = getAmountPerTick({
    amount: monsterHealthMaximumValue,
    duration,
    ticks,
  });

  useTimerDelta({
    delta: setMonsterRegenerationDelta,
    onDelta: () => {
      changeMonsterHealth({
        delta: [
          {
            color: "text-muted",
            value: "REGENERATE",
          },
          {
            color: "text-success",
            value: `+${regenerationAmount}`,
          },
        ],
        value: regenerationAmount,
      });

      resetMonsterRegenerationDelta();
    },
    stop:
      isMonsterAtFullHealthValue ||
      isMonsterBurning ||
      isMonsterDeadValue ||
      regenerationAmount === 0,
  });

  return (
    <IconDisplay Icon={IconMonsterHealth} tooltip="Monster health">
      <MonsterHealthMeter />
    </IconDisplay>
  );
}
