import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { MonsterRegenerationMeter } from "@neverquest/components/Monster/MonsterRegenerationMeter";
import { MONSTER_REGENERATION } from "@neverquest/data/monster";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useTimer } from "@neverquest/hooks/useTimer";
import {
  isMonsterAiling,
  isMonsterAtFullHealth,
  isMonsterDead,
  isMonsterRegenerating,
  monsterHealthMaximum,
  monsterRegenerationDuration,
} from "@neverquest/state/monster";
import { getAmountPerTick } from "@neverquest/utilities/getters";

export function MonsterRegeneration() {
  const isMonsterBurning = useRecoilValue(isMonsterAiling("burning"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterAtFullHealthValue = useRecoilValue(isMonsterAtFullHealth);
  const isMonsterRegeneratingValue = useRecoilValue(isMonsterRegenerating);
  const monsterHealthMaximumValue = useRecoilValue(monsterHealthMaximum);
  const setMonsterRegenerationDuration = useSetRecoilState(monsterRegenerationDuration);

  const changeMonsterHealth = useChangeMonsterHealth();

  const { duration, minimum, ticks } = MONSTER_REGENERATION;
  const regenerationAmount = Math.max(
    minimum,
    Math.round(
      getAmountPerTick({
        amount: monsterHealthMaximumValue,
        duration,
        ticks,
      }),
    ),
  );

  useTimer({
    onElapsed: () => {
      changeMonsterHealth({ value: regenerationAmount });
    },
    setTick: setMonsterRegenerationDuration,
    stop: isMonsterAtFullHealthValue || isMonsterBurning || isMonsterDeadValue,
  });

  useEffect(() => {
    if (!isMonsterAtFullHealthValue && !isMonsterRegeneratingValue) {
      setMonsterRegenerationDuration(Math.round(duration / ticks));
    }
  }, [
    duration,
    isMonsterAtFullHealthValue,
    isMonsterRegeneratingValue,
    setMonsterRegenerationDuration,
    ticks,
  ]);

  return <MonsterRegenerationMeter amount={regenerationAmount} />;
}
