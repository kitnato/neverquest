import { useRecoilValue, useSetRecoilState } from "recoil";

import { MonsterRegenerationMeter } from "@neverquest/components/Monster/MonsterRegenerationMeter";
import { MONSTER_REGENERATION } from "@neverquest/data/monster";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import {
  isMonsterAiling,
  isMonsterAtFullHealth,
  isMonsterDead,
  monsterHealthMaximum,
  monsterRegenerationDuration,
} from "@neverquest/state/monster";
import { getAmountPerTick } from "@neverquest/utilities/getters";

export function MonsterRegeneration() {
  const isMonsterBurning = useRecoilValue(isMonsterAiling("burning"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterAtFullHealthValue = useRecoilValue(isMonsterAtFullHealth);
  const monsterHealthMaximumValue = useRecoilValue(monsterHealthMaximum);
  const setMonsterRegenerationDuration = useSetRecoilState(monsterRegenerationDuration);

  const changeMonsterHealth = useChangeMonsterHealth();

  const { duration, ticks } = MONSTER_REGENERATION;
  const regenerationAmount = getAmountPerTick({
    amount: monsterHealthMaximumValue,
    duration,
    ticks,
  });

  useTimerDelta({
    delta: setMonsterRegenerationDuration,
    onDelta: () => {
      changeMonsterHealth({ value: regenerationAmount });
    },
    stop: isMonsterAtFullHealthValue || isMonsterBurning || isMonsterDeadValue,
  });

  return <MonsterRegenerationMeter amount={regenerationAmount} />;
}
