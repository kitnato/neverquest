import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import { POISON } from "@neverquest/constants";
import useChangeHealth from "@neverquest/hooks/actions/useChangeHealth";
import useAnimation from "@neverquest/hooks/useAnimation";
import { poisonDuration } from "@neverquest/state/character";
import { monsterDamage } from "@neverquest/state/monster";
import { FloatingText, UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";
import { getDamagePerTick } from "@neverquest/utilities/getters";

export default function () {
  const [poisonDurationValue, setPoisonDuration] = useRecoilState(poisonDuration);
  const monsterDamageValue = useRecoilValue(monsterDamage);

  const changeHealth = useChangeHealth();

  const [deltaPoisoned, setDeltaPoisoned] = useState(0);

  const { damage, duration, ticks } = POISON;
  const poisonDelta = duration / ticks;
  const poisonDamage = getDamagePerTick({
    damage: monsterDamageValue,
    duration,
    proportion: damage,
    ticks,
  });
  const stoppedPoisoning = poisonDurationValue <= 0;

  useAnimation((delta) => {
    setPoisonDuration((current) => current - delta);
    setDeltaPoisoned((current) => current + delta);
  }, stoppedPoisoning);

  useEffect(() => {
    if (deltaPoisoned >= poisonDelta) {
      changeHealth({
        delta: {
          color: FloatingText.Negative,
          value: `POISONED (-${poisonDamage})`,
        },
        value: -poisonDamage,
      });
      setDeltaPoisoned(0);
    }
  }, [changeHealth, deltaPoisoned, poisonDamage, poisonDelta]);

  useEffect(() => {
    if (stoppedPoisoning) {
      setPoisonDuration(0);
      setDeltaPoisoned(0);
    }
  }, [setPoisonDuration, stoppedPoisoning]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(poisonDurationValue)}
      value={(poisonDurationValue / duration) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
