import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { POISON } from "@neverquest/data/constants";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { poisonDuration } from "@neverquest/state/character";
import { poisonedDelta } from "@neverquest/state/deltas";
import { monsterDamage } from "@neverquest/state/monster";
import { formatMilliseconds } from "@neverquest/utilities/formatters";
import { getDamagePerTick } from "@neverquest/utilities/getters";

export function PoisonedMeter() {
  const resetPoisonedDelta = useResetRecoilState(poisonedDelta);
  const [poisonedDeltaValue, setPoisonedDelta] = useRecoilState(poisonedDelta);
  const [poisonDurationValue, setPoisonDuration] = useRecoilState(poisonDuration);
  const monsterDamageValue = useRecoilValue(monsterDamage);

  const changeHealth = useChangeHealth();

  const { damage, duration, ticks } = POISON;
  const poisonDelta = duration / ticks;
  const poisonTick = getDamagePerTick({
    damage: monsterDamageValue,
    duration,
    proportion: damage,
    ticks,
  });

  useAnimation((delta) => {
    const newDelta = poisonedDeltaValue + delta;

    if (newDelta >= poisonDelta) {
      changeHealth({
        delta: {
          color: "text-danger",
          value: `POISONED (-${poisonTick})`,
        },
        value: -poisonTick,
      });
      resetPoisonedDelta();
    } else {
      setPoisonedDelta(newDelta);
    }

    let newDuration = poisonDurationValue - delta;

    if (newDuration < 0) {
      newDuration = 0;
    }

    setPoisonDuration(newDuration);
  }, poisonDurationValue <= 0);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(poisonDurationValue)}
      value={(poisonDurationValue / duration) * 100}
      variant="secondary"
    />
  );
}
