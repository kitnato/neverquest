import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import { POISON } from "@neverquest/constants";
import useChangeHealth from "@neverquest/hooks/actions/useChangeHealth";
import useAnimation from "@neverquest/hooks/useAnimation";
import { poisonDuration } from "@neverquest/state/character";
import { monsterDamage } from "@neverquest/state/monster";
import { FloatingTextVariant, UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";
import { getDamagePerTick } from "@neverquest/utilities/getters";

export default function () {
  const [poisonDurationValue, setPoisonDuration] = useRecoilState(poisonDuration);
  const monsterDamageValue = useRecoilValue(monsterDamage);

  const changeHealth = useChangeHealth();

  const [deltaPoisoned, setDeltaPoisoned] = useState(0);

  const { damage, duration, ticks } = POISON;
  const poisonDelta = duration / ticks;
  const poisonPerTick = getDamagePerTick({
    damage: monsterDamageValue,
    duration,
    proportion: damage,
    ticks,
  });
  const hasPoisonEnded = poisonDurationValue <= 0;

  useEffect(() => {
    if (deltaPoisoned >= poisonDelta) {
      changeHealth({
        delta: {
          color: FloatingTextVariant.Negative,
          value: `POISONED (-${poisonPerTick})`,
        },
        value: -poisonPerTick,
      });
      setDeltaPoisoned(0);
    }
  }, [changeHealth, deltaPoisoned, poisonDelta, poisonPerTick]);

  useEffect(() => {
    if (hasPoisonEnded) {
      setPoisonDuration(0);
      setDeltaPoisoned(0);
    }
  }, [hasPoisonEnded, setPoisonDuration]);

  useAnimation((delta) => {
    setPoisonDuration((current) => current - delta);
    setDeltaPoisoned((current) => current + delta);
  }, hasPoisonEnded);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(poisonDurationValue)}
      value={(poisonDurationValue / duration) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
